import { Model } from "mongoose";

import { Appointment } from "../../appointments/entities/appointment.entity";
import { Article } from "../../articles/entities/article.entity";
import { City } from "../../cities/entities";
import { User } from "../../users/entities";

import {
  appointmentFeatures,
  appointmentOptions,
  articleFeatures,
  articleOptions,
  cityOptions,
  userFeatures,
  userOptions
} from "../config";

export const getAdminResources = (
  userModel: Model<User>,
  articleModel: Model<Article>,
  appointmentModel: Model<Appointment>,
  cityModel: Model<City>,
): any => {

  return [
    { resource: userModel, options: userOptions, features: userFeatures, },
    { resource: articleModel, options: articleOptions, features: articleFeatures, },
    { resource: appointmentModel, options: appointmentOptions, features: appointmentFeatures, },
    { resource: cityModel, options: cityOptions },
  ]
}
