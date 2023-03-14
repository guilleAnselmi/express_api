import { Router } from "express";
import tests from "./tests";
const router = Router();
const routes = [
  {
    path: "tests",
    router: tests,
  },
];

routes.forEach((route) => {
  router.use(`/${route.path}`, route.router);
});

export { routes, router };
export default router;
