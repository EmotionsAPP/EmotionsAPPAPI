import { Model } from "mongoose";

import { Appointment } from "../../appointments/entities/appointment.entity";
import { Article } from "../../articles/entities/article.entity";
import { City } from "../../cities/entities";
import { User } from "../../users/entities";
import { Admin } from "../entities/admin.entity";
import { Log } from "../../logs/entities/log.entity";

import {
  adminOptions,
  appointmentOptions,
  articleOptions,
  cityOptions,
  userOptions
} from "../config";

import {
  adminFeatures,
  appointmentFeatures,
  articleFeatures,
  cityFeatures,
  userFeatures,
} from '../features';

import { createLogResource } from "../resources";

export const getAdminResources = (
  userModel: Model<User>,
  articleModel: Model<Article>,
  appointmentModel: Model<Appointment>,
  cityModel: Model<City>,
  adminModel: Model<Admin>,
  logModel: Model<Log>
): any => {

  return [
    { resource: adminModel, options: adminOptions, features: adminFeatures },
    { resource: userModel, options: userOptions, features: userFeatures, },
    { resource: articleModel, options: articleOptions, features: articleFeatures, },
    { resource: appointmentModel, options: appointmentOptions, features: appointmentFeatures, },
    { resource: cityModel, options: cityOptions, features: cityFeatures, },
    createLogResource(logModel)
  ]
}
