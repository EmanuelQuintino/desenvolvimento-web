import { Request, Response, NextFunction } from "express";
import { userRepository } from "../repositories/userRepository";
import { compare } from "bcrypt";
import { z } from "zod";

export const userControllers = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userSchema = z
        .object({
          name: z
            .string({
              required_error: "Name is required!",
              invalid_type_error: "Name must be a string!",
            })
            .min(3, "Name must have at least 3 characters!")
            .max(255, "Max name length exceeded!"),

          email: z
            .string({
              required_error: "Email is required!",
              invalid_type_error: "Email must be a string!",
            })
            .email("Email poorly formatted!")
            .max(255, "Max email length exceeded!"),

          password: z
            .string({
              required_error: "Password is required!",
              invalid_type_error: "Password must be a string!",
            })
            .min(7, "Password must have at least 7 characters!")
            .max(255, "Max password length exceeded")
            .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{7,}$/, {
              message:
                "The password must contain at least one capital letter, one number and one special character!",
            }),
        })
        .strict();

      const { name, email, password } = userSchema.parse(req.body);

      const userExists = await userRepository.getByEmail(email);
      if (userExists) throw res.status(400).json({ message: "email already exists!" });

      const userCreated = await userRepository.create({ name, email, password });

      return res.status(201).json(userCreated);
    } catch (error) {
      return next(error);
    }
  },

  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { password } = req.body;

      if (!password) {
        throw res.status(400).json({ message: "please confirm your password" });
      }

      const user = await userRepository.getByID(id);
      if (!user) throw res.status(404).json({ message: "user not found!" });

      const passwordCheck = await compare(password, user.password);
      if (!passwordCheck) {
        throw res.status(401).json({ message: "invalid password!" });
      }

      const { name, email } = user;
      return res.status(200).send({ name, email });
    } catch (error) {
      return next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const userSchema = z.object({
        name: z
          .string({
            required_error: "Name is required!",
            invalid_type_error: "Name must be a string!",
          })
          .min(3, "Name must have at least 3 characters")
          .max(255, "Max name length exceeded"),

        email: z
          .string({
            required_error: "Email is required!",
            invalid_type_error: "Email must be a string!",
          })
          .email("Email poorly formatted!")
          .max(255, "Max email length exceeded!"),

        password: z.string({
          required_error: "Please, confirm your password!",
          invalid_type_error: "Password must be a string!",
        }),

        newPassword: z
          .string({ invalid_type_error: "Password must be a string!" })
          .min(7, "Password must have at least 7 characters!")
          .max(255, "Max password length exceeded!")
          .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{7,}$/, {
            message:
              "The password must contain at least one capital letter, one number and one special character!",
          })
          .nullable(),
      });

      const { id } = req.params;
      const { name, email, password, newPassword } = userSchema.parse(req.body);

      const user = await userRepository.getByID(id);
      if (!user) throw res.status(404).json({ message: "user not found!" });

      const passwordCheck = await compare(password, user.password);
      if (!passwordCheck) {
        throw res.status(400).json({ message: "invalid password!" });
      }

      const userEmail = await userRepository.getByEmail(email);
      if (userEmail && userEmail.id != id) {
        throw res.status(400).json({ message: "email already exists!" });
      }

      const userUpdated = await userRepository.update({ id, name, email, newPassword });

      return res.status(200).json(userUpdated);
    } catch (error) {
      return next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { password } = req.body;

      if (!password) {
        throw res.status(400).json({ message: "please, confirm your password!" });
      }

      const user = await userRepository.getByID(id);
      if (!user) throw res.status(404).json({ message: "user not found!" });

      const passwordCheck = await compare(password, user.password);
      if (!passwordCheck) {
        throw res.status(400).json({ message: "invalid password!" });
      }

      const userDeleted = await userRepository.delete(id);
      return res.status(200).json(userDeleted);
    } catch (error) {
      return next(error);
    }
  },
};
