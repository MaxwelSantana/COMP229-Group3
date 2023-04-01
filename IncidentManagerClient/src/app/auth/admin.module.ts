import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { AdminComponent } from "./admin.component";
import { AuthGuard } from "./auth.guard";
import { IncidentTableComponent } from "../incident/incidentTable.component";
import { IncidentEditorComponent } from "../incident/incidentEditor.component";

let routing = RouterModule.forChild([
    { path: "auth", component: AuthComponent },
    {
        path: "main", component: AdminComponent, canActivate: [AuthGuard],
        children: [
            { path: "products/:mode/:id", component: IncidentEditorComponent },
            { path: "products/:mode", component: IncidentEditorComponent },
            { path: "products", component: IncidentTableComponent },
            { path: "**", redirectTo: "products" }
        ]
    },
    { path: "**", redirectTo: "auth" }
]);

@NgModule({
    imports: [CommonModule, FormsModule],
    providers: [AuthGuard],
    declarations: [AuthComponent, AdminComponent]
})

export class AdminModule { }