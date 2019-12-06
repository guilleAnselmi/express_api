import Test from '@/models/test';

class TestController {
  findAll() {
    return Test.find();
  }

  create() {
    return Test.create({ test: 'test1' });
  }
}

export default new TestController();
