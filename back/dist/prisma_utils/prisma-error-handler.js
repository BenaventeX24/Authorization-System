"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaErrorHandler = void 0;
function PrismaErrorHandler(e) {
    let catchedError = new Error("UKNOWN_ERROR");
    if (e.code === "P2002") {
        let error = e.meta;
        error.target.forEach((target) => {
            if (target === "email")
                catchedError = new Error("REPEATED_EMAIL");
            else
                catchedError = new Error("UKNOWN_ERROR");
        });
    }
    return catchedError;
}
exports.PrismaErrorHandler = PrismaErrorHandler;
//# sourceMappingURL=prisma-error-handler.js.map