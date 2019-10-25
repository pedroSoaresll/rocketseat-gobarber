import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userExists) {
      return res.status(400).json({
        error: 'User already exists.',
      });
    }

    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;
    console.log(req.body);
    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const emailExists = await User.findOne({
        where: {
          email,
        },
      });

      if (emailExists) {
        return res.status(400).json({
          error: 'User already exists.',
        });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({
        error: 'Password does not match.',
      });
    }

    const { id, name, provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      provider,
    });
  }
}

export default new UserController();
