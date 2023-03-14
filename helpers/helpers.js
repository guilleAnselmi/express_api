//TODO refactor this helpers (are bad written and old)
import url from "url";
import fs from "fs";
import _ from 'loadsh'
import uuid from 'uuid';
import { createToken } from "./token";

 export default {
  upload: function (req, res, next, cb) {
    var prefix = "";
    if (req.originalUrl) {
      var p = req.originalUrl.split("/");
      if (p.length >= 3) {
        prefix = p[1] + "_";
      }
    }

    var _self = this;
    if (req.files && req.files.file) {
      var file = req.files.file;

      var tmp = file.type.split("/");
      if (tmp.length == 2 && (tmp[0] == "image" || tmp[1] == "pdf")) {
        var newFileName = prefix + uuid.v4() + "." + tmp[1];
        fs.rename(
          file.path,
          req.settings.imagesDir + newFileName,
          function (err) {
            if (err) {
              return res.status(400).json({ errors: _self.formatErrors(err) });
            } else {
              if (cb) {
                cb(newFileName);
              }
              return res.status(200).json({ file: newFileName });
            }
          }
        );
      } else {
        return res.status(400).json({ errors: "No image files uploaded" });
      }
    } else {
      return res.status(400).json({ errors: "No file uploaded" });
    }
  },

  deleteFiles: function (req, res) {
    console.log("entro", req.body);
    if (req.body) {
      req.body.forEach((el) => {
        fs.unlink(`${req.settings.imagesDir}/${el}`, (err) => {
          console.log(`error al borrar el archivo. ${err}`);
        });
      });
      res.status(200).json({
        message: "Imagenes borradas con exito",
      });
    } else {
      res.status(400).json({
        message: "bad request",
        body: req.body,
      });
    }
  },

  findById: (model, req, res) => {
    model
      .findById(req.params.id)
      .then((item) => {
        console.log(`finbyid then`, item);
        if (item) {
          res.status(200).json(item);
        } else {
          res.status(404).json({
            message: `No se ha encontrado objecto con id: ${req.params.id}`,
          });
        }
      })
      .catch((error) => {
        res.status(404).json({
          message: `No se ha encontrado objecto con id: ${req.params.id}`,
          error,
        });
      });
  },

  register: (model, req, res) => {
    const params = req.body;
    debug(params);

    // check for duplicate 'email' in this case
    if (params && params.email) {
      model
        .findOne({ email: params.email })
        .then((user) => {
          if (user) {
            res.status(400).json({
              message: "Ya existe un usuario registrado con esos datos",
              error: {},
            });
          } else {
            model
              .create(req.body)
              .then((user) => {
                createToken(user)
                  .then((accessToken) => {
                    console.log("register token response ", accessToken);
                    res.status(200).json({
                      user,
                      accessToken,
                    });
                  })
                  .catch((error) => {
                    return Promise.reject(error);
                  });
              })
              .catch((error) => {
                return Promise.reject(error);
              });
          }
        })
        .catch((error) => {
          res.status(400).json({
            message: "Ocurrio un error",
            error,
          });
        });
    } else {
      res.status(400).json({
        message: "Ocurrio un error",
        error: {},
      });
    }
  },

  login: (model, req, res) => {
    const params = req.body;
    console.log(params);
    if (params.user && params.password) {
      model
        .findOne({
          user: params.user,
          password: params.password,
        })
        .select("-password")
        .then((user) => {
          if (user) {
            console.log(`antes de crear token ${user}`);
            return createToken(user);
          } else {
            return Promise.reject(error);
          }
        })
        .then((accessToken) => {
          console.log("accessToken response ", accessToken);
          res.status(200).json({
            accessToken,
          });
        })
        .catch((error) => {
          res.status(401).json({
            message: "Login incorrecto",
            error,
          });
        });
    } else {
      res.status(401).json({
        message: "Login incorrecto",
        error: {},
      });
    }
  },

  delete: (model, req, res) => {
    if (req.params.id) {
      model
        .deleteOne({ _id: req.params.id })
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((error) => {
          res.status(400).json({
            message: error.message || "Error al borrar",
            error: error,
          });
        });
    } else {
      res.status(200).send();
    }
  },

  find: (model, req, res) => {
    let urlParts = url.parse(req.url, true);
    let queryParams = urlParts.query;
    console.log("find: ", queryParams);

    let sort,
      filter = {};
    let populates = [];

    if (queryParams.sort) {
      sort = JSON.parse(queryParams.sort);
    }

    if (queryParams._filters) {
      filter = JSON.parse(queryParams._filters);
    }

    if (queryParams._populates) {
      populates = JSON.parse(queryParams._populates);
    }

    model
      .find(filter)
      .populate(populates || [])
      .sort(sort)
      .then((find) => {
        console.log(`find result`, find);
        res.status(200).json(find);
      })
      .catch((error) => {
        res.status(4004).json({
          message: error.message || "Ocurrio un error inesperado",
          error,
        });
      });
  },

  save: (model, req, res) => {
    const params = req.body;

    if (req.params.id) {
      params.id = req.params.id;
    }

    if (params.id) {
      model
        .update({ _id: params.id }, params)
        .then((data) => {
          return res.status(200).json(data);
        })
        .catch((error) => {
          return res.status(400).json({
            message: error.message || "no se pudo actualizar objeto",
            error,
          });
        });
    } else {
      model
        .create(params)
        .then((data) => {
          console.log(`create `, data);
          if (data.password) {
            data.password = null;
          }
          return res.status(200).json(data);
        })
        .catch((error) => {
          return res.status(400).json({
            message: error.message || "no se pudo crear objeto",
            error,
          });
        });
    }
  },

  update: (model, req, res) => {
    const body = req.body;
    console.log("Upate body", body);
    model
      .findByIdAndUpdate(body._id, body, { new: true })
      .then((data) => {
        console.log(data);
        return res.status(202).json(data);
      })
      .catch((err) => {
        console.log("error", err);
        return res.status(400).json(err);
      });
  },

  deleteAll: (model, req, res) => {
    model
      .deleteMany()
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((error) => {
        return res.status(400).json({
          message: error.message || "no se pudo crear objeto",
          error,
        });
      });
  },

  parseQueryString: function (req) {
    var urlParts = url.parse(req.url, true);
    return urlParts.query;
  },

  formatErrors: (errorsIn) => {
    const errors = [];

    if (typeof errorsIn == "object") {
      var error = {
        name: errorsIn["name"],
        message: errorsIn["message"],
      };

      if (errorsIn.fields) {
        error.extra = errorsIn.fields;
      }

      if (errorsIn.sql) {
        error.sql = errorsIn.sql;
      }
      errors.push(error);
    } else if (typeof errorsIn == "array") {
    }

    return errors;
  },
  handleError: (error) => {},
};
