import { Model } from "mongoose";

import { Appointment } from "../../appointments/entities/appointment.entity";
import { Article } from "../../articles/entities/article.entity";
import { City } from "../../cities/entities";
import { User } from "../../users/entities";
import { Admin } from "../entities/admin.entity";
import { Log } from "../../logs/entities/log.entity";

import {
  createAdminResource,
  createAppointmentResource,
  createArticleResource,
  createCityResource,
  createLogResource,
  createUserResource
} from "../resources";

export const getAdminResources = (
  userModel: Model<User>,
  articleModel: Model<Article>,
  appointmentModel: Model<Appointment>,
  cityModel: Model<City>,
  adminModel: Model<Admin>,
  logModel: Model<Log>
): any => {

  return [
    createAdminResource(adminModel),
    createUserResource(userModel),
    createArticleResource(articleModel),
    createAppointmentResource(appointmentModel),
    createCityResource(cityModel),
    createLogResource(logModel)
  ]
}
