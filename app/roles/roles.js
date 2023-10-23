const Roles = [
    {
        name: "admin",
        default: false
    },
    {
        name: "user",
        default: true
    }
];

 const getRoleNames = () => {
    const roleNames = Roles.map((role) => role.name);
    return roleNames;
};

const getDefaultRoleName = () => {
    const role = Roles.find((role) => role.default);
    return role.name;
}

module.exports = {
    roleNames: getRoleNames(),
    defaultRoleName: getDefaultRoleName()
}