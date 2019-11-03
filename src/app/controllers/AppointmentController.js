import * as Yup from 'yup';
import Appointment from '../models/Appointment';
import user from '../models/User';

class AppointmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      res.status(400).json({
        error: 'Validation fails',
      });
    }

    const { provider_id, date } = req.body;

    // check if provider id is a valid provider
    const provider = await user.findOne({
      where: {
        id: provider_id,
        provider: true,
      },
    });

    if (!provider) {
      return res.status(401).json({
        error: 'You can only create appointments with providers',
      });
    }

    // check if user have same id of the provier
    if (req.userId === provider_id) {
      return res.status(401).json({
        error: 'You can not create an appointment with yourself',
      });
    }

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
