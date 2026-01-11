import { NextFunction, Request, Response } from "express";
import { ROLES } from "../utils/constants";
import { HttpError } from "../utils/error";

const alloRoles = (...roles: ROLES[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const userRole = res.locals.user.role as ROLES;

        if (!roles.includes(userRole)) {
            throw new HttpError("Forbidden: You don't have permission to access this resource", 403);
        }
        
        next();
    }
}

export const isAdmin = alloRoles(ROLES.ADMIN);
export const isInstrukturOrAsesor = alloRoles(ROLES.INSTRUKTUR, ROLES.ASESOR);
export const isDirektur = alloRoles(ROLES.DIREKTUR);
export const isPeserta = alloRoles(ROLES.PESERTA);
export const isAdminOrDirektur = alloRoles(ROLES.ADMIN, ROLES.DIREKTUR);