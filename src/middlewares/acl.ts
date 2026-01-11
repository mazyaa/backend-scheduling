import { NextFunction, Request, Response } from "express";
import { RoleUser } from "@prisma/client";
import { HttpError } from "../utils/error";

const alloRoles = (...roles: RoleUser[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const userRole = res.locals.user.role as RoleUser;

        if (!roles.includes(userRole)) {
            throw new HttpError("Forbidden: You don't have permission to access this resource", 403);
        }
        
        next();
    }
}

export const isAdmin = alloRoles(RoleUser.admin);
export const isInstrukturOrAsesor = alloRoles(RoleUser.instruktur, RoleUser.asesor);
export const isInstruktur = alloRoles(RoleUser.instruktur);
export const isAsesor = alloRoles(RoleUser.asesor);
export const isPeserta = alloRoles(RoleUser.peserta);
export const isDirektur = alloRoles(RoleUser.direktur);
export const isAdminOrDirektur = alloRoles(RoleUser.admin, RoleUser.direktur);