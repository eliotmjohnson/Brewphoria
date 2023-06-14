import classes from "./Login.module.css";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthContext from "../../state/authContext";
import firstNameLogo from "../../assets/Images/icons8-name-tag-100.png";
import lastNameLogo from "../../assets/Images/icons8-name-tag-outline.png";
import userLogo from "../../assets/Images/icons8-username-100.png";
import passwordLogo from "../../assets/Images/icons8-password-500.png";
import drinkBg from "../../assets/Images/ash-edmonds-DhHMOrQd7jE-unsplash.jpg";
import logo from "../../assets/Images/drinks.svg";

const Login = () => {
	const [register, setRegister] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			setIsVisible(true);
		}, 50);
	}, []);

	const goToRegister = () => {
		setRegister((prev) => !prev);
	};

	const goBackHome = () => {
		navigate("/");
	};

	const initialValues = {
		username: "",
		password: "",
		firstName: "",
		lastName: "",
	};

	const loginValidationSchema = Yup.object().shape({
		username: Yup.string()
			.matches(
				"^(?=[a-z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$",
				"Username must be lower case, may not contain spaces or special characters, and is 8-20 characters long"
			)
			.required("Username required")
			.strict(),
		password: Yup.string()
			.matches(
				"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
				"Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one digit, and one special character."
			)
			.required("Password required")
			.strict(),
	});

	const registerValidationSchema = Yup.object().shape({
		firstName: Yup.string()
			.matches(/^[a-z ,.'-]+$/i, "Name is invalid")
			.required("First name required")
			.strict(),
		lastName: Yup.string()
			.matches(/^[a-z ,.'-]+$/i, "Name is invalid")
			.required("Last name required")
			.strict(),
		username: Yup.string()
			.matches(
				"^(?=[a-z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$",
				"Username must be lower case, may not contain spaces or special characters, and is 8-20 characters long"
			)
			.required("Username required")
			.strict(),
		password: Yup.string()
			.matches(
				"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
				"Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one digit, and one special character."
			)
			.required("Password required")
			.strict(),
	});

	const handleSubmit = (values) => {
		const body = {
			username: values.username,
			password: values.password,
			firstName: values.firstName,
			lastName: values.lastName,
		};

		axios
			.post(register ? `/register` : `/login`, body)
			.then((res) => {
				const { exp, firstName, lastName, token, userId, username } = res.data;

				authContext.login(token, userId, username, firstName, lastName, exp);

				navigate(authContext.page);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<main className={classes.Login} style={{ opacity: isVisible ? "1" : "0" }}>
			<section>
				<div
					className={classes["login-form-container"]}
					style={{ translate: isVisible ? "0 0" : "0 3rem" }}
				>
					<h1 onClick={goBackHome}>
						Brewphoria
						<img src={logo} />
					</h1>
					<Formik
						initialValues={initialValues}
						validationSchema={
							register ? registerValidationSchema : loginValidationSchema
						}
						onSubmit={handleSubmit}
					>
						{({ errors, touched }) => {
							return (
								<Form className={classes["login-form"]}>
									{register ? (
										<>
											<span
												className={
													errors.firstName && touched.firstName
														? classes.invalid
														: ""
												}
											>
												<img
													style={{ marginBottom: ".20rem" }}
													src={firstNameLogo}
												/>
												<Field
													type="text"
													name="firstName"
													autoComplete="off"
													className={classes.inputs}
													placeholder={"First Name"}
												/>
												<ErrorMessage
													name="firstName"
													className={classes["error-message"]}
													component="aside"
												/>
											</span>
											<span
												style={{ marginBottom: "1.5rem" }}
												className={
													errors.lastName && touched.lastName
														? classes.invalid
														: ""
												}
											>
												<img
													style={{ marginBottom: ".20rem" }}
													src={lastNameLogo}
												/>
												<Field
													type="text"
													name="lastName"
													autoComplete="off"
													className={classes.inputs}
													placeholder={"Last Name"}
												/>
												<ErrorMessage
													name="lastName"
													className={classes["error-message"]}
													component="aside"
												/>
											</span>
										</>
									) : undefined}
									<span
										className={
											errors.username && touched.username ? classes.invalid : ""
										}
									>
										<img src={userLogo} />
										<Field
											type="text"
											autoComplete="off"
											className={classes.inputs}
											name="username"
											placeholder={"Username"}
										/>
										<ErrorMessage
											name="username"
											className={classes["error-message"]}
											component="aside"
										/>
									</span>
									<span
										className={
											errors.password && touched.password ? classes.invalid : ""
										}
									>
										<img
											style={{ marginBottom: ".25rem" }}
											src={passwordLogo}
										/>
										<Field
											type="password"
											name="password"
											autoComplete="off"
											className={classes.inputs}
											placeholder={"Password"}
										/>
										<ErrorMessage
											name="password"
											className={classes["error-message"]}
											component="aside"
										/>
									</span>
									<button type="submit">
										{register ? "Create Account" : "Login"}
									</button>
									<div className={classes["create-account"]}>
										<p>
											{register ? "Need to login?" : "Don't have an account?"}
										</p>
										<h2 onClick={goToRegister}>
											{register ? "Login" : "Create Account"}
										</h2>
									</div>
								</Form>
							);
						}}
					</Formik>
				</div>
			</section>
			<img src={drinkBg} />
		</main>
	);
};

export default Login;
