import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Avatar,
    IconButton,
    Typography,
    Alert,
    Snackbar
} from "@mui/material";
import { PhotoCamera, Delete } from "@mui/icons-material"; // Đổi từ Delete sang RestartAlt
import { useDispatch, useSelector } from "react-redux";
import { updateProfileAction, uploadAvatarAction } from "../../Redux/Auth/auth.action";

const EditProfileModal = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const { auth } = useSelector(store => store);

    // Default avatar URL
    const DEFAULT_AVATAR = "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png";

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: ""
    });

    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [isDefaultAvatar, setIsDefaultAvatar] = useState(false); // Track if using default

    // Notification states
    const [notification, setNotification] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    // Update form data khi auth.user thay đổi
    useEffect(() => {
        if (auth.user) {
            setFormData({
                firstName: auth.user.firstName || "",
                lastName: auth.user.lastName || ""
            });

            // Set avatar preview
            const currentAvatar = auth.user.avatar
                ? `http://localhost:8080${auth.user.avatar}`
                : DEFAULT_AVATAR;
            setAvatarPreview(currentAvatar);
            setIsDefaultAvatar(false);
        }
    }, [auth.user]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                showNotification("Please select an image file", "error");
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                showNotification("File size must be less than 5MB", "error");
                return;
            }

            setAvatarFile(file);
            setIsDefaultAvatar(false); // Reset default flag when new file selected

            // Create preview URL cho file mới
            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatarPreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Reset avatar về default thay vì xóa
    const handleResetToDefault = async () => {
        try {
            setLoading(true);

            // Tạo blob từ default avatar URL
            const response = await fetch(DEFAULT_AVATAR);
            const blob = await response.blob();
            const defaultFile = new File([blob], "default-avatar.png", { type: "image/png" });

            // Upload default avatar
            await dispatch(uploadAvatarAction(defaultFile));

            // Update preview
            setAvatarPreview(DEFAULT_AVATAR);
            setAvatarFile(null);
            setIsDefaultAvatar(true);

            showNotification("Avatar reset to default successfully!", "success");

        } catch (error) {
            console.error("Reset to default failed:", error);
            showNotification("Failed to reset avatar: " + error.message, "error");
        } finally {
            setLoading(false);
        }
    };

    const showNotification = (message, severity = "success") => {
        setNotification({
            open: true,
            message,
            severity
        });
    };

    const handleCloseNotification = () => {
        setNotification(prev => ({ ...prev, open: false }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let updateSuccess = false;
            let successMessages = [];

            // Upload avatar nếu có file mới (không phải default)
            if (avatarFile && !isDefaultAvatar) {
                console.log("Uploading avatar...", avatarFile.name, avatarFile.size);

                try {
                    await dispatch(uploadAvatarAction(avatarFile));
                    console.log("Avatar upload successful");
                    successMessages.push("Avatar updated");
                    updateSuccess = true;
                } catch (avatarError) {
                    console.error("Avatar upload failed:", avatarError);
                    showNotification("Failed to upload avatar: " + avatarError.message, "error");
                    setLoading(false);
                    return;
                }
            }

            // Update name nếu có thay đổi
            const nameChanged = formData.firstName !== auth.user?.firstName ||
                formData.lastName !== auth.user?.lastName;

            if (nameChanged) {
                console.log("Updating profile name...");
                try {
                    await dispatch(updateProfileAction(formData));
                    console.log("Name update successful");
                    successMessages.push("Name updated");
                    updateSuccess = true;
                } catch (nameError) {
                    console.error("Name update failed:", nameError);
                    showNotification("Failed to update name: " + nameError.message, "error");
                    setLoading(false);
                    return;
                }
            }

            // Show success message và đóng modal
            if (updateSuccess) {
                const message = successMessages.length > 0
                    ? `Profile updated successfully! (${successMessages.join(", ")})`
                    : "Profile updated successfully!";

                showNotification(message, "success");

                // Đóng modal sau 1 giây để user thấy notification
                setTimeout(() => {
                    onClose();
                    window.location.reload();
                }, 1000);
            } else {
                showNotification("No changes to save", "info");
            }

        } catch (error) {
            console.error("General update error:", error);
            showNotification("Failed to update profile: " + error.message, "error");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        // Reset form về giá trị ban đầu khi đóng
        setFormData({
            firstName: auth.user?.firstName || "",
            lastName: auth.user?.lastName || ""
        });
        setAvatarFile(null);
        setIsDefaultAvatar(false);
        // Reset avatar preview về ảnh hiện tại
        const currentAvatar = auth.user?.avatar
            ? `http://localhost:8080${auth.user.avatar}`
            : DEFAULT_AVATAR;
        setAvatarPreview(currentAvatar);
        onClose();
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Edit Profile</DialogTitle>

                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>

                            {/* Avatar Upload Section */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                <Typography variant="subtitle1" sx={{ alignSelf: 'flex-start' }}>
                                    Profile Picture
                                </Typography>

                                <Box sx={{ position: 'relative' }}>
                                    <Avatar
                                        src={avatarPreview}
                                        sx={{ width: 120, height: 120 }}
                                    >
                                        {!avatarPreview && (auth.user?.firstName?.[0] || 'U')}
                                    </Avatar>

                                    {/* Upload Button */}
                                    <IconButton
                                        color="primary"
                                        aria-label="upload picture"
                                        component="label"
                                        disabled={loading}
                                        sx={{
                                            position: 'absolute',
                                            bottom: -8,
                                            right: -8,
                                            backgroundColor: 'white',
                                            boxShadow: 2,
                                            '&:hover': {
                                                backgroundColor: 'grey.100'
                                            }
                                        }}
                                    >
                                        <input
                                            hidden
                                            accept="image/*"
                                            type="file"
                                            onChange={handleAvatarChange}
                                        />
                                        <PhotoCamera />
                                    </IconButton>

                                    {/* Reset to Default Button */}
                                    <IconButton
                                        color="error"
                                        aria-label="reset to default avatar"
                                        onClick={handleResetToDefault}
                                        disabled={loading}
                                        sx={{
                                            position: 'absolute',
                                            top: -8,
                                            right: -8,
                                            backgroundColor: 'white',
                                            boxShadow: 2,
                                            '&:hover': {
                                                backgroundColor: 'grey.100'
                                            }
                                        }}
                                    >
                                        <Delete />
                                    </IconButton>
                                </Box>

                                <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
                                    Click the camera icon to upload a new picture
                                    <br />
                                    Click the reset icon to use default avatar
                                    <br />
                                    Supported formats: JPG, PNG, GIF (Max 5MB)
                                </Typography>
                            </Box>

                            {/* Name Fields */}
                            <TextField
                                name="firstName"
                                label="First Name"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                variant="outlined"
                                disabled={loading}
                            />

                            <TextField
                                name="lastName"
                                label="Last Name"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                variant="outlined"
                                disabled={loading}
                            />
                        </Box>
                    </DialogContent>

                    <DialogActions sx={{ p: 3 }}>
                        <Button onClick={handleClose} disabled={loading}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            sx={{ minWidth: 100 }}
                        >
                            {loading ? "Saving..." : "Save"}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            {/* Notification Snackbar */}
            <Snackbar
                open={notification.open}
                autoHideDuration={4000}
                onClose={handleCloseNotification}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseNotification}
                    severity={notification.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {notification.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default EditProfileModal;