import catchASync from "../utils/catchASync";



// @route       POST /api/mail/forgot-password
// @purpose     send forgot password link
// @access      User
export const forgotPassword = catchASync(async (req, res) => {
  return res.json({
    status: "success",
    message: "mail sent",
  });
});
