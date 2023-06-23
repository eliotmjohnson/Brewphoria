import classes from "./Profile.module.css";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../../../state/authContext";

const Profile = () => {
	const { username, firstName, lastName, userId, token, logout } =
		useContext(AuthContext);
	const [feedback, setFeedback] = useState({
		isFeedback: false,
		error: false,
		feedback: "",
	});
	const [deleteAccount, setDeleteAccount] = useState(false);
	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		if (token) {
			if (username) {
				if (username === id) {
					return;
				}
				if (username !== id) {
					navigate("/");
				}
			}
		} else if (token === undefined) {
			navigate("/");
		}
	}, [username, id, token]);

	const initialValues = {
		oldPassword: "",
		newPassword: "",
	};

	const handleSubmit = (values, { setSubmitting, resetForm }) => {
		axios
			.post(`/updatePassword/${userId}`, values, {
				headers: {
					Authorization: token,
				},
			})
			.then((res) => {
				setFeedback((prev) => {
					return {
						...prev,
						isFeedback: true,
						feedback: res.data,
					};
				});

				setTimeout(() => {
					setFeedback((prev) => {
						return {
							...prev,
							isFeedback: false,
							error: false,
							feedback: "",
						};
					});
				}, 3000);

				setSubmitting(false);
				resetForm();
			})
			.catch((error) => {
				setFeedback((prev) => {
					return {
						...prev,
						isFeedback: true,
						error: true,
						feedback: error.response.data,
					};
				});

				setSubmitting(false);

				setTimeout(() => {
					setFeedback((prev) => {
						return {
							...prev,
							isFeedback: false,
							error: false,
							feedback: "",
						};
					});
				}, 3000);
			});
	};

	const loginValidationSchema = Yup.object().shape({
		oldPassword: Yup.string()
			.matches(
				"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
				"Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one digit, and one special character."
			)
			.required("Password required")
			.strict(),

		newPassword: Yup.string()
			.matches(
				"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
				"Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one digit, and one special character."
			)
			.required("Password required")
			.strict(),
	});

	const logoutAccount = () => {
		logout();
		navigate("/");
	};

	const showDeleteModal = () => {
		setDeleteAccount((prev) => true);
	};

	const closeModal = () => {
		setDeleteAccount((prev) => false);
	};

	const destroyAccount = () => {
		axios
			.delete(`/deleteAccount/${userId}`, {
				headers: {
					Authorization: token,
				},
			})
			.then((res) => {
				logout();
				navigate("/");
			})
			.catch((error) => console.log(error));
	};

	return (
		<div className={classes.profile}>
			<div>
				<h1>Profile</h1>
				<button className={classes.logout} onClick={logoutAccount}>
					Logout
				</button>
				<div className={classes.personalInfo}>
					<div>
						<h1>Personal Information</h1>
					</div>
					<span>
						<div className={classes.nameContainer}>
							<div className={classes.nameInfo}>
								<h1>First Name</h1>
								<p>{firstName}</p>
							</div>
							<div className={classes.nameInfo}>
								<h1>Last Name</h1>
								<p>{lastName}</p>
							</div>
						</div>
						<span className={classes.username}>
							<div className={classes.nameInfo}>
								<h1>Username</h1>
								<p>{username}</p>
							</div>
						</span>
					</span>
					<button
						className={classes["delete-account"]}
						onClick={showDeleteModal}
					>
						Delete Account
					</button>
				</div>
				<hr className={classes.divider} />
				<div className={classes.passwordContainer}>
					<h1>
						{feedback.isFeedback && feedback.error
							? feedback.feedback
							: "Change Password"}
					</h1>
					<Formik
						initialValues={initialValues}
						onSubmit={handleSubmit}
						validationSchema={loginValidationSchema}
					>
						{({ errors, touched, isSubmitting }) => {
							return (
								<Form className={classes.changePass}>
									<div className={classes.passDiv}>
										<span
											className={
												errors.oldPassword && touched.oldPassword
													? classes.invalid
													: ""
											}
										>
											<Field
												type="password"
												autoComplete="off"
												className={classes.inputs}
												name="oldPassword"
												placeholder="Old Password"
											/>
											<ErrorMessage
												name="oldPassword"
												className={classes["error-message"]}
												component="aside"
											/>
										</span>
									</div>
									<div className={classes.passDiv}>
										<span
											className={
												errors.newPassword && touched.newPassword
													? classes.invalid
													: ""
											}
										>
											<Field
												type="password"
												autoComplete="off"
												className={classes.inputs}
												name="newPassword"
												placeholder="New Password"
											/>
											<ErrorMessage
												name="newPassword"
												className={classes["error-message"]}
												component="aside"
											/>
										</span>
										<div className={classes["button-container"]}>
											<button type="reset" className={classes["discard"]}>
												Discard Changes
											</button>
											<button
												className={classes["save-button"]}
												type="submit"
												disabled={isSubmitting | feedback.error}
											>
												{isSubmitting
													? "Updating..."
													: !feedback.error && feedback.isFeedback
													? feedback.feedback
													: "Save Changes"}
											</button>
										</div>
									</div>
								</Form>
							);
						}}
					</Formik>
				</div>
			</div>
			<div
				className={`${classes["delete-modal"]} ${
					deleteAccount ? classes.modalActive : undefined
				}`}
			>
				<section className={`${deleteAccount ? classes.modalActive : ""}`}>
					<h1>Are you sure you want to delete your account?</h1>
					<p>You will lose all saved information</p>
					<div className={classes["modal-buttons"]}>
						<button onClick={destroyAccount}>Yes</button>
						<button className={classes.no} onClick={closeModal}>
							No
						</button>
					</div>
				</section>
			</div>
		</div>
	);
};

export default Profile;
