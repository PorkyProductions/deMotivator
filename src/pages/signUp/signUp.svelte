<script lang="ts">
  // Import generic stylesheets, essential libraries
  import "../../styles/css/app.css";
  import "../../styles/css/customProps.css";
  import confetti from "canvas-confetti";
  import lbl from '../../img/login-background-light.svg'
  import lbd from '../../img/login-background-dark.svg'
  // Import components
  import Title from "../../components/title.svelte";
  import BsSpinner from "../../components/bs-spinner.svelte";
  import Auth from "../login/auth.svelte";
  import BsAlert from "../../components/bs-Alert.svelte";
  import BsButton from "../../components/bsButton.svelte";
  import BsLoader from "../../components/bsLoader.svelte";
  import Icon from '../../components/icon.svelte'
  //  Import Misc Helpers
  import { fade } from "svelte/transition";
  import { bsTheme, darkMode } from "../../utils/darkMode";
  import { randomInRange } from "@porkyproductions/hat/randomInRange";
  import { randomInArray } from "@porkyproductions/hat/randomInArray";
  import {name} from '../../typescript/constants'

  let names: string[] = [
    "Yamilet Martin",
    "Patrick Tormey",
    "Ronald Martin",
    "Mohammad Kadel",
    "Jes Tabbert",
    "Stephen White",
    "Reuben White",
    "Cecelia Rainey",
    "Anthony Irwin",
    "Andrew Lopez",
    "Brian Ohrt",
    "Etha Jackowski",
    "Avery Taylor",
    "Raymond Abelson",
    "Taylor Irwin",
    "Dixie Fadler",
    "Emily Garcia",
    "Steve Scott",
    "Brooklyn Tevlin",
    "Javion Hanz",
    "Emmy Martin",
    "Deacon Green",
    "Jazlynn Gabbert",
    "Fred Fader",
    "Holly Westcott",
    "Carl Kairis",
    "Patrick Smith",
    "Scott Abby",
    "Sophia Carter",
    "Amani Urick",
    "Dexter Cabello",
    "Abigail Eady",
    "Miranda Fader",
    "Efrain Williams",
    "Samantha Abelson",
    "Etha Phillips",
    "Emmanuel Hernandez",
    "Jerry Ealy",
    "Andrew Labelle",
    "Marisol Urick",
    "Tyler Waggett",
    "Javion Mabrey",
    "Tabitha Tevlin",
    "Natalie Garcia",
    "Cecelia Mitchell",
    "Diamond Collins",
    "Dallas Davis",
    "Amber Thomas",
    "Miranda Evans",
    "Katherine Bacon",
    "Glenn Uhler",
    "Morgan Williams",
    "Atticus Yniguez",
    "Riley Miller",
    "Diamond Anderson",
    "Aldo Labelle",
    "Henry Fadler",
    "Grace Rainey",
    "Jackson Taylor",
    "Mark Smith",
    "Alexis Xavier",
    "Cesar Hill",
    "Olivia Garcia",
    "Van Campbell",
    "Jackson Clark",
    "Jason Allen",
    "Hunter Nagy",
    "Ryan Parker",
    "Brooklyn Thompson",
    "Aniya Anderson",
    "Jeffrey Tabbert",
    "Miah Cahn",
    "Caden Williams",
    "Victor Xavier",
    "Cesar Garcia",
    "Jes Gagnon",
    "Jose Scott",
    "Aubrey Kadel",
    "Mia Tevlin",
    "Aiden Wesenberg",
    "Gregory White",
    "Mia Harris",
    "David Miller",
    "Reuben Turner",
    "Camilla Tabbert",
    "Raymond Perez",
    "Xzavier Yniguez",
    "Steve Vasko",
    "Jacquelyn Jackson",
    "Glenn Fadler",
    "Cierra Wilson",
    "Paityn Irwin",
    "Henry Evans",
    "Saige Perez",
    "Avery Xander",
    "Brenton Lopez",
    "Jose Jackowski",
    "Ryan Mullin",
    "Tristan Winata"
  ];
  let dismissedBanner = window.localStorage.getItem("dismissedBanner")
  let randomName = randomInArray(names);

  // Loading Logic
  let ready = false;
  let yay = false;
  let duration = randomInRange(1, 4000);
  const load = async () => {
    const { SplashScreen } = await import("@capacitor/splash-screen");
    await SplashScreen.show({
      showDuration: duration,
      autoHide: true,
    });
    setTimeout(() => (ready = true), duration);
  };
  load();

  // FROM BEYOND THIS POINT IS FIREBASE LOGIC
  // BEWARE

  import {  initializeApp } from "firebase/app";
  import { getAnalytics, } from "firebase/analytics";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  import { firebaseConfig } from "../../typescript/insults";
  import { getAuth } from "firebase/auth";

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app)
  let error: Error | null | undefined | unknown  = null;
// TODO: refactor to async/await
  const signUp = async (auth: any, displayName: string, email: string, password: string, photoURL?: string) => {
    error = null
    try {
      const { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } =
      await import("firebase/auth");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      await sendEmailVerification(user)
      await updateProfile(user, {
        displayName: displayName,
        photoURL: photoURL
      })
    } catch (e) {
      error = e
    }
  };
  let agreedToTerms = false;

  const signUpHandler = async (event) => {
    const { randomInRange } = await import("@porkyproductions/hat/randomInRange");
    const { displayName, email, password, photoURL } = event.target.elements;
    const { emailRegExp, pwRegExp } = await import('../../utils/regEx')
    try {
      error = null;
      if (!agreedToTerms) {
        throw new Error(
          "You must agree to the terms and conditions before signing up!"
        );
      }
      if (password.length <= 7) {
        throw new Error(
          "Password must be at least 8 characters"
        );
      }
      if (emailRegExp.test(email.value) === false) {
        throw new Error(
          "Must be a valid email adress"
        );
      }
      if (pwRegExp.test(password.value) === false) {
        throw new Error(
          "Password must meet the following requirements: Must be at least 8 characters long. Must contain at least 1 capital letter. Must contain at least 1 number. Must contain at least 1 symbol from the set '@$!%*#?&'"
        );
      }
      await signUp(auth, displayName.value, email.value, password.value, photoURL.value);
      for (let i = 0; i <= 3; i++) {
        confetti({
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          particleCount: randomInRange(50, 100),
          origin: { y: 0.6 },
        });
      }
      yay = true
    } catch (err) {
      error = err;
    }
  };

  
  let emailBoxContent: any
  let emailBox
  let emailInvalid = true
  let pwText = ""
  let pwInvalid = true

  const onChangeLoginText = async () => {
    const { isEmailValid, isPwValid } = await import( "../../utils/regEx");
    if (isPwValid(pwText)) {
      pwInvalid = false
    } else pwInvalid = true
    if (isEmailValid(emailBoxContent)) {
      emailInvalid = false
    } else emailInvalid = true
  }
</script>

<div id="root" data-bs-theme={bsTheme}>
  <Auth useRedirect={true} let:loggedIn>
    {#if !ready}
      {#if loggedIn}
        <div class="p-4">
          <BsSpinner type="success" />
        </div>
        <div class="m-auto px-8">
          <BsLoader type="success" loadingTime={duration} />
        </div>
      {:else}
        {#if error}
          <div class="p-4">
            <BsSpinner type="danger" />
          </div>
          <div class="m-auto px-8">
            <BsLoader type="danger" loadingTime={duration} />
          </div>
        {/if}
          <div class="p-4">
            <BsSpinner type="primary" />
          </div>
          <div class="m-auto px-8">
            <BsLoader type="primary" loadingTime={duration} />
          </div>
      {/if}
    {:else}
      <div id="wrapper" class="relative right-0 left-0 top-0 bottom-0">
          {#if error}
            <div transition:fade class="p-2 mb-6">
              <BsAlert
                icon="exclamation-diamond-fill"
                actionLink=" "
                actionText=" "
                type="danger"
                text={error.message ?? "An error occured. Try again"}
              />
            </div>
          {/if}
          {#if !dismissedBanner}
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div aria-describedby="banner" aria-labelledby="banner" aria-roledescription="banner"  transition:fade class="p-2 mb-6" on:click={window.localStorage.setItem("dismissedBanner", "true")} on:keydown={() => void(0)}>
              <BsAlert
              icon="info-circle"
              type="info"
              text={`By using ${name} with an account, you consent to our, as well as Google's cookies`}
              actionLink="https://policies.google.com/privacy"
              actionText="Learn More"
              />
            </div>
          {/if}
          {#if error}
            <div transition:fade class="p-2 mb-6">
              <BsAlert
                icon="exclamation-diamond-fill"
                actionLink=" "
                actionText=" "
                type="danger"
                text={error.message ?? "An error occured. Try again"}
              />
            </div>
          {/if}
          {#if yay}
            <div transition:fade class="p-2 mb-6">
              <BsAlert
                icon="emoji-laughing"
                actionLink="/login.html"
                actionText="View your account"
                type="success"
                text={"Account successfully created!"}
              />
            </div>
          {/if}
        <div class="">
          <div class="wrapper flex content-center justify-center ">
            {#if loggedIn}
              <div class="font-primary text-4xl font-medium">
                <Title />
                You're already logged in! <a href="/login.html" class="link link-success underline">View your Account</a>
              </div>
            {:else}
            <div class="w-full flex flex-wrap">

              <div class="w-full md:w-1/2 flex flex-col" transition:fade>
      
                  <div class="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
                      <a href="/" class="p-10 m-10 text-center"><Title /></a>
                  </div>
      
                  <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                      <form class="flex flex-col pt-3 md:pt-8" on:submit|preventDefault={signUpHandler}>
                        <div class="mb-4">
                          <label class="form-label" for="email">Email</label>
                          <input
                            class={`input-field form-control dark:bg-black focus:cursor-text hover:focus:cursor-text hover:cursor-text ${emailInvalid ? "is-invalid" : "is-valid"}`}
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            bind:value={emailBoxContent}
                            on:change={onChangeLoginText}
                            bind:this={emailBox}
                            required
                          />
                          <div class="invalid-feedback">Must be valid email!</div>
                        </div>
                        <div class="mb-6">
                          <label class="form-label" for="password">Password</label>
                          <input
                            class={`input-field form-control dark:bg-black focus:cursor-text hover:focus:cursor-text hover:cursor-text ${pwInvalid ? "is-invalid" : "is-valid"}`}
                            id="password"
                            type="password"
                            placeholder="******************"
                            required
                            bind:value={pwText}
                            on:change={onChangeLoginText}
                          />
                          <div class="invalid-feedback">Password must meet the following requirements: Must be at least 8 characters long. Must contain at least 1 capital letter. Must contain at least 1 number. Must contain at least 1 symbol from the set '@$!%*#?&'</div>
                        </div>
                        <div class="mb-6">
                          <label class="form-label" for="displayName">Display Name</label>
                          <input
                            class={`input-field form-control dark:bg-black focus:cursor-text hover:focus:cursor-text hover:cursor-text`}
                            id="displayName"
                            type="text"
                            placeholder={randomName}
                          />
                        </div>
                        <div class="mb-6">
                          <label class="form-label" for="photoURL">Photo URL</label>
                          <input
                            class={`input-field form-control dark:bg-black focus:cursor-text hover:focus:cursor-text hover:cursor-text`}
                            id="photoURL"
                            type="url"
                            placeholder="https://images.unsplash.com/photo-1692744642837-0afc5b12912b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
                          />
                        </div>
                        <div class="form-check pb-4">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            bind:checked={agreedToTerms}
                            value=""
                            id="flexCheckDefault"
                            required
                          />
                          <label class="form-check-label" for="flexCheckDefault">
                            I agree to the <a href=" ">Terms and Conditions</a> and
                            <a href="https://policies.google.com/privacy"
                              >Privacy Policy</a
                            >
                          </label>
                        </div>
          
                          <button type="submit" value="Log In"   class={`btn btn-${yay ? "success" : "primary"} p-2 mt-8`}>Sign Up <Icon name="person-plus" /></button>
                      </form>
                      <div class="text-center pt-12 pb-12">
                          <div>Already have an account? <a href="login.html" class="underline font-semibold">Sign in</a></div>
                      </div>
                  </div>
      
              </div>
      
              <!-- Image Section -->
              <div class="w-1/2">
                  <img class="object-cover w-full h-screen hidden md:block" draggable="false"  src={darkMode ? lbd : lbl} alt="multicolored polka dots">
              </div>
          </div>
            {/if}
          </div>
          <div class="flex content-center justify-center p-4 pb-10">
            <BsButton
              icon="arrow-left"
              text="Go back home"
              type={yay ? "success" : "primary"}
              href="index.html"
            />
          </div>
        </div>
      </div>
    {/if}
  </Auth>
</div>