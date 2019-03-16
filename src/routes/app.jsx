import Dashboard from 'views/Dashboard/Dashboard';
import NewPatient from 'views/PatientManagement/PatientManagement'
import ExistingPatient from 'views/ExistingPatient/ExistingPatient'

const appRoutes = [
    { path: "/admin/dashboard", name: "Dashboard", icon: "pe-7s-graph", component: Dashboard },
    { path: "/admin/new-patient", name: "Add Patient", icon: "pe-7s-user", component: NewPatient },
    { path: "/admin/existing-patient", name: "View Patient", icon: "pe-7s-users", component: ExistingPatient },
    { redirect: true, path:"/admin", to:"/admin/dashboard", name: "Dashboard" },
];

export default appRoutes;
