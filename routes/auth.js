import express from "express";
import { register, login, otp } from "../controllers/authCn.js";

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - email
 *              - username
 *              - password
 *              - phone
 *          properties:
 *              _id:
 *                  type: string
 *                  description: The unique user id
 *              email:
 *                  type: string
 *                  description: The unique email for each person
 *              username:
 *                  type: string
 *                  description: The unique username for each person
 *              password:
 *                  type: string
 *                  description: The password
 *              address:
 *                  type: string
 *                  description: The Home Address of user
 *              role:
 *                  type: string
 *                  description: The role of each user
 *                  default: 'user'
 *                  enum: ['user','admin','superAdmin']
 *              token:
 *                  type: number
 *                  description: The sms that is sent to the user when logging in
 *              expireTime:
 *                  type: number
 *                  description: expireTime for token
 *              createdAt:
 *                  type: string
 *                  format: date-time
 *                  readOnly: true
 *                  description: When the user was created
 *              updatedAt:
 *                  type: string
 *                  format: date-time
 *                  readOnly: true
 *                  description: When the user was updated
 *          example:
 *              _id: 66511b128cad81a95adb85b8
 *              email: simple@gmail.com
 *              username: Maziar111
 *              password: password123
 *              address: something ...
 *              phone: 09123456311
 *              role: user
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: API for Users
 * api/v1/auth:
 *  post:
 *      summary: Login to Account
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          200 (OK):
 *              description: a success message
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: success
 *                              message:
 *                                  type: string
 *                                  example: sms successfully send
 *          400:
 *              description: request failed
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string 
 *                                  example: failed
 *                              message:
 *                                  type: string
 *                                  example: error message from sms panel
 * api/v1/auth/register:
 *  post:
 *      summary: Create New Account
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          201 (OK):
 *              description: register
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: success
 *                              message:
 *                                  type: string
 *                                  example: register successfully
 *              
 * api/v1/auth/otp:
 *  post:
 *      summary: Check Otp Code
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          token:
 *                              type: number
 *                          code:
 *                              type: number
 *      responses:
 *          200 (OK):
 *              description: Check Code
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status: 
 *                                  type: string
 *                                  example: success
 *                              data:
 *                                  type: string
 *                                  example:
 *                                      token:
 *                                          type: string
 *                                          example: bfndlanlvdsnvlsdvksndvlk
 *                                      user:
 *                                          type: string
 *                                          example: Maziar
 *                              message:
 *                                  type: string
 *                                  example: login successfully
 *          400:
 *              description: request failed
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: failed
 *                              message:
 *                                  type: string
 *                                  example: code incorrect
*/



const authRoute = express.Router();

authRoute.route("/").post(login);
authRoute.route("/register").post(register);
authRoute.route("/otp").post(otp);

export default authRoute;