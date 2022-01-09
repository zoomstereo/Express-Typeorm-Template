"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ select: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], User.prototype, "permissionLevel", void 0);
User = __decorate([
    (0, typeorm_1.Entity)("users")
], User);
exports.User = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5lbnRpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9lbnRpdHkvdXNlci5lbnRpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUNBQWlFO0FBR2pFLElBQWEsSUFBSSxHQUFqQixNQUFhLElBQUk7Q0FrQmhCLENBQUE7QUFoQkc7SUFEQyxJQUFBLGdDQUFzQixHQUFFOztnQ0FDZDtBQUdYO0lBREMsSUFBQSxnQkFBTSxHQUFFOzttQ0FDSztBQUdkO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDOztzQ0FDVDtBQUdqQjtJQURDLElBQUEsZ0JBQU0sR0FBRTs7dUNBQ1U7QUFHbkI7SUFEQyxJQUFBLGdCQUFNLEdBQUU7O3NDQUNTO0FBR2xCO0lBREMsSUFBQSxnQkFBTSxHQUFFOzs2Q0FDZ0I7QUFqQmhCLElBQUk7SUFEaEIsSUFBQSxnQkFBTSxFQUFDLE9BQU8sQ0FBQztHQUNILElBQUksQ0FrQmhCO0FBbEJZLG9CQUFJIn0=