import Test from '~/models/test';

class TestController {
  findAll() {
    return Test.findAll();
  }
}

export default new TestController();
