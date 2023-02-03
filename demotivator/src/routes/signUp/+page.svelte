<script lang="ts">
  // Import generic stylesheets, essential libraries
  import "../../styles/css/app.css";
  import "../../styles/css/customProps.css";
  import "../../styles/scss/colorScheme.scss";
  import "bootstrap/scss/bootstrap-reboot.scss";
  import "@capacitor/core";
  import "bootstrap/dist/css/bootstrap.css";
  import confetti from "canvas-confetti";
  // Import components
  import Title from "../../components/title.svelte";
  import BsSpinner from "../../components/bs-spinner.svelte";
  import Auth from "../login/auth.svelte";
  import leftArrow from "bootstrap-icons/icons/arrow-left.svg";
  import BsAlert from "../../components/bs-Alert.svelte";
  import BsButton from "../../components/bsButton.svelte";
  import BsLoader from "../../components/bsLoader.svelte";
  // Import Icons
  import warning from "bootstrap-icons/icons/exclamation-diamond-fill.svg";
  import info from "bootstrap-icons/icons/info-circle.svg";
  // Import Misc Helpers
  import { fade } from "svelte/transition";
  import { onDestroy } from "svelte";
  import { darkMode } from "../../utils/darkMode";
  import { randomInRange } from "../../utils/random";

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

  let randomName = names[Math.floor(Math.random() * names.length)];

  // Loading Logic
  let ready = false;
  let duration = randomInRange(1, 4000);
  const load = async () => {
    const { SplashScreen } = await import("@capacitor/splash-screen");
    await SplashScreen.show({
      showDuration: duration,
      autoHide: true,
    });
    const loadingTimer = setTimeout(() => (ready = true), duration);
  };
  load();

  // FROM BEYOND THIS POINT IS FIREBASE LOGIC
  // BEWARE

  import { initializeApp } from "firebase/app";
  import { firebaseConfig } from "../../typescript/insults";

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  import { getAuth } from "firebase/auth";
  const auth = getAuth(app);
  const user = auth.currentUser;

  const signUp = async (auth: any, displayName: string, email: string, password: string, photoURL?: string) => {
    const { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } =
    await import("firebase/auth");
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        sendEmailVerification(auth.currentUser);
        updateProfile(user, {
          displayName: displayName,
          photoURL: photoURL
        })
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  let error = null;
  let agreedToTerms = false;

  const signUpHandler = async (event) => {
    const { randomInRange } = await import("../../utils/random");
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
    } catch (err) {
      error = err;
    }
  };
</script>

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
      {:else}
        <div class="p-4">
          <BsSpinner type="primary" />
        </div>
        <div class="m-auto px-8">
          <BsLoader type="primary" loadingTime={duration} />
        </div>
      {/if}
    {/if}
  {:else}
    <div id="wrapper" class="absolute top-0 bottom-0 right-0 left-0">
      {#if darkMode == true}
        <BsAlert
          icon={info}
          iconAlt="info"
          type="dark"
          text="By using (de)Motivator with an account, you consent to our, as well as Google's cookies."
          actionLink="https://policies.google.com/privacy"
          actionText="Learn More"
        />
        {#if error}
          <div transition:fade class="p-2 mb-6">
            <BsAlert
              icon={warning}
              iconAlt={warning}
              actionLink=" "
              actionText=" "
              type="danger"
              text={error.message ?? "An error occured. Try again"}
            />
          </div>
        {/if}
      {:else}
        <BsAlert
          icon={info}
          iconAlt="info"
          type="info"
          text="By using (de)Motivator with an account, you consent to our, as well as Google's cookies."
          actionLink="https://policies.google.com/privacy"
          actionText="Learn More"
        />
        {#if error}
          <div transition:fade class="p-2 mb-6">
            <BsAlert
              icon={warning}
              iconAlt={warning}
              actionLink=" "
              actionText=" "
              type="danger"
              text={error.message ?? "An error occured. Try again"}
            />
          </div>
        {/if}
      {/if}
      <Title />
      <h3 class="text-center font-primary font-light">Sign Up</h3>
      <div class="">
        <div class="wrapper flex content-center justify-center ">
          {#if loggedIn}
            {(window.location.href = "/login")}
          {:else}
            <div class="w-full max-w-xs" transition:fade>
              <div class=" flex content-center justify-center">
                <form
                  on:submit|preventDefault={signUpHandler}
                  class="px-8 pt-6 pb-8 shadow-md border-primary-majorelleBlue border-2 rounded-lg dark:border-secondary-orangePantone dark:border-2"
                >
                  <div class="mb-4">
                    <label class="form-label" for="displayName"
                      >Display Name</label
                    >
                    <input
                      class="input-field form-control dark:bg-black focus:cursor-text hover:focus:cursor-text hover:cursor-text"
                      id="displayName"
                      type="text"
                      placeholder={randomName}
                      required
                    />
                  </div>
                  <div class="mb-4">
                    <label class="form-label" for="email">Email</label>
                    <input
                      class="input-field form-control dark:bg-black focus:cursor-text hover:focus:cursor-text hover:cursor-text"
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                  <div class="mb-4">
                    <label class="form-label" for="photoURL">URL for your profile photo</label>
                    <input
                      class="input-field form-control dark:bg-black focus:cursor-text hover:focus:cursor-text hover:cursor-text"
                      id="photoURL"
                      type="url"
                      placeholder="https://vetmed.illinois.edu/wp-content/uploads/2021/04/pc-keller-hedgehog.jpg"
                    />
                  </div>
                  <div class="mb-6">
                    <label class="form-label" for="password">Password</label>
                    <input
                      class="input-field form-control dark:bg-black focus:cursor-text hover:focus:cursor-text hover:cursor-text"
                      id="password"
                      type="password"
                      placeholder="******************"
                      required
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
                  <div>
                    <button type="submit" class="btn btn-primary"
                      >Sign Up</button
                    >
                  </div>
                  <div id="emailHelp" class="form-text">
                    By clicking 'sign up' you are agreeing to share your email
                    with PorkyProductions, which will be securely stored in our
                    servers, and will never be shared with anyone else.
                  </div>
                  <div class="mt-3">
                    <a href="/login" type="button" class="btn btn-secondary"
                      >Sign In</a
                    >
                  </div>
                </form>
              </div>
            </div>
          {/if}
        </div>
        <div class="flex content-center justify-center p-4 pb-10">
          <BsButton
            icon={leftArrow}
            iconAlt="a left facing arrow"
            text="Go back home"
            type="success"
            href="/"
          />
        </div>
      </div>
    </div>
  {/if}
</Auth>

<style>
  div#wrapper {
    background-image: url(../../img/login-background-light.svg);
    color: hsl(0, 0%, 0%);
  }
  form {
    background-color: white;
  }
  @media (prefers-color-scheme: dark) {
    div#wrapper {
      background-image: url(../../img/login-background-dark.svg);
      color: hsl(0, 0%, 100%);
    }
    form {
      background-color: black;
    }
  }
</style>
