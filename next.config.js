const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "filip",
        mongodb_password: "y5BSUo96fRBGUp4V",
        mongodb_database: "monthlyExpenses",
      },
    };
  } else {
    return {
      env: {
        mongodb_username: "filip",
        mongodb_password: "y5BSUo96fRBGUp4V",
        mongodb_database: "paymentTracker",
      },
    };
  }
};
