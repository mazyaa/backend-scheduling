import { NextFunction, Request, Response } from "express";
import { RoleUser } from "@prisma/client";
import { HttpError } from "../utils/error";

const allowRoles = (...roles: RoleUser[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const userRole = res.locals.currentUserLogin.role as RoleUser;

        if (!roles.includes(userRole)) {
            throw new HttpError("Forbidden: You don't have permission to access this resource", 403);
        }
        
        next();
    }
}

export const isAdmin = allowRoles(RoleUser.admin);
export const isInstrukturOrAsesor = allowRoles(RoleUser.instruktur, RoleUser.asesor);
export const isInstruktur = allowRoles(RoleUser.instruktur);
export const isAsesor = allowRoles(RoleUser.asesor);
export const isPeserta = allowRoles(RoleUser.peserta);
export const isDirektur = allowRoles(RoleUser.direktur);
export const isAdminOrDirektur = allowRoles(RoleUser.admin, RoleUser.direktur);