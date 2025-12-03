<script>
  // Import generic stylesheets, essential libraries
  import "../../styles/css/app.css";
  import hedgehog from '../../img/HedgehogIcon.png'
  
  // Import components
  import BsSpinner from "../../components/bs-spinner.svelte";
  import Icon from "../../components/icon.svelte";
  import Auth from "../login/auth.svelte";
  import BsAlert from "../../components/bs-Alert.svelte";
  import BsLoader from "../../components/bsLoader.svelte";
  import Footer from "../../components/footer.svelte";

  // Import Misc Helpers
  import { onMount } from "svelte";
  import { bsTheme, darkMode } from "../../utils/darkMode";
  import { randomInRange } from "@porkyproductions/hat/randomInRange";
  import { randomInArray } from "@porkyproductions/hat/randomInArray";
  import { deviceType } from "../../utils/uaStub";
  import { fade, fly } from "svelte/transition";
  import confetti from "canvas-confetti";
  import { name } from "../../typescript/constants";

  // Firebase Logic
  import { initializeApp } from "firebase/app";
  import { getAnalytics } from "firebase/analytics";
  import { firebaseConfig } from "../../typescript/insults";
  import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);

  // Sample names for placeholder
  let names = [
    "Yamilet Martin", "Patrick Tormey", "Ronald Martin", "Mohammad Kadel",
    "Jes Tabbert", "Stephen White", "Reuben White", "Cecelia Rainey",
    "Anthony Irwin", "Andrew Lopez", "Brian Ohrt", "Etha Jackowski"
  ];
  let randomName = randomInArray(names);

  // UI State
  let emailBoxContent = $state("");
  let pwText = $state("");
  let confirmPwText = $state("");
  let displayNameText = $state("");
  let photoURLText = $state("");
  let emailInvalid = $state(false);
  let pwInvalid = $state(false);
  let confirmPwInvalid = $state(false);
  let agreedToTerms = $state(false);
  let dismissedBanner = $state(window.localStorage.getItem("dismissedBanner") === "true");
  let signupSuccess = $state(false);

  // Loading Logic
  let ready = $state(false);
  let loadingDuration = randomInRange(800, 2000);

  let error = $state(null);

  const load = async () => {
    setTimeout(() => (ready = true), loadingDuration);
  };
  load();

  const onChangeSignupText = async () => {
    const { isEmailValid, isPwValid } = await import("../../utils/regEx");
    pwInvalid = !isPwValid(pwText);
    emailInvalid = !isEmailValid(emailBoxContent);
    confirmPwInvalid = pwText !== confirmPwText || !confirmPwText;
  };
  
  // Helper function to determine form validation classes
  const getValidationClass = (value, isInvalid) => {
    if (!value) return ""; // No validation class if empty
    return isInvalid ? "is-invalid" : "is-valid";
  };

  const signUpHandler = async (event) => {
    event.preventDefault();
    
    if (deviceType === "desktop") {
      ready = false;
    }

    try {
      error = null;
      
      // Validate agreement to terms
      if (!agreedToTerms) {
        throw new Error("You must agree to the terms and conditions before signing up!");
      }
      
      // Validate password match
      if (pwText !== confirmPwText) {
        throw new Error("Passwords do not match!");
      }
      
      // Validate email and password format
      const { emailRegExp, pwRegExp } = await import('../../utils/regEx');
      if (!emailRegExp.test(emailBoxContent)) {
        throw new Error("Must be a valid email address");
      }
      if (!pwRegExp.test(pwText)) {
        throw new Error("Password must meet security requirements");
      }
      
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, emailBoxContent, pwText);
      const user = userCredential.user;
      
      // Send verification email
      await sendEmailVerification(user);
      
      // Update profile with display name and photo
      await updateProfile(user, {
        displayName: displayNameText || randomName,
        photoURL: photoURLText || null
      });
      
      // Success celebration
      const { randomInRange } = await import("@porkyproductions/hat/randomInRange");
      confetti({
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        particleCount: randomInRange(50, 100),
        origin: { y: 0.6 },
      });
      
      if (typeof hapticsImpactMedium !== 'undefined') await hapticsImpactMedium();
      if (typeof hapticsVibrate !== 'undefined') await hapticsVibrate();
      
      signupSuccess = true;
      setTimeout(() => (ready = true), 1000);
      
    } catch (err) {
      error = err;
      ready = true;
    }
  };
</script>

<div id="root" data-bs-theme={bsTheme} class="min-h-screen w-full bg-body">
  <Auth useRedirect={signupSuccess} let:loggedIn>
    {#if !ready}
      <div transition:fade={{ duration: 300 }} class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-body backdrop-blur-sm">
        <div class="mb-4">
          <BsSpinner type={signupSuccess ? "success" : error ? "danger" : "primary"} />
        </div>
        <BsLoader type={signupSuccess ? "success" : error ? "danger" : "primary"} loadingTime={loadingDuration} />
      </div>
    {/if}

    <div class="flex min-h-screen w-full overflow-hidden">
      <div class="w-full lg:w-1/2 flex flex-col justify-center p-4 sm:p-5 lg:p-12 relative z-10">
        <div class="mb-5 text-center lg:text-start">
          <a href="/" class="text-decoration-none">
            <span class="display-6 fw-bold text-body">
              PorkyProductions<span class="text-secondary">ID</span>
            </span>
          </a>
        </div>

        {#if error}
          <div transition:fly={{ y: -20 }} class="mb-4">
            <BsAlert
              icon="exclamation-diamond-fill"
              type="danger"
              text={error.message ?? "An unknown error occurred."}
            />
          </div>
        {/if}

        {#if !dismissedBanner && !loggedIn}
          <div transition:fade class="mb-4">
            <BsAlert
              icon="info-circle"
              type="info"
              text={`By using ${name} with an account, you consent to our and Google's cookies.`}
              actionLink="https://policies.google.com/privacy"
              actionText="Learn More"
              onclick={() => { dismissedBanner = true; window.localStorage.setItem("dismissedBanner", "true"); }}
            />
          </div>
        {/if}

        {#if signupSuccess}
          <div transition:fly={{ y: -20 }} class="mb-4">
            <BsAlert
              icon="check-circle-fill"
              type="success"
              text="Account successfully created! Please check your email for verification."
              actionLink="/login.html"
              actionText="Sign In"
            />
          </div>
        {/if}

        {#if loggedIn}
          <div in:fade={{ duration: 300, delay: 150 }} class="card shadow-lg border-0 rounded-4 overflow-hidden">
            <div class="card-body p-5 text-center">
              <h2 class="card-title fw-bold mb-3">You're Already Logged In!</h2>
              <p class="text-secondary mb-4">You already have an active session.</p>
              <a href="/login.html" class="btn btn-primary btn-lg w-100 rounded-3">
                <i class="bi bi-person-circle me-2"></i> View Your Account
              </a>
            </div>
          </div>
        {:else}
          <div in:fade={{ duration: 300, delay: 150 }} class="mx-auto w-100" style="max-width: 480px;">
            <div class="mb-5">
              <h1 class="fw-bold mb-2">Create your account</h1>
            </div>

            <form onsubmit={signUpHandler} class="d-flex flex-column gap-3">
              <div class="row g-3">
                <div class="col-12">
                  <label class="form-label fw-semibold" for="email">Email Address</label>
                  <input
                    class={`form-control form-control-lg ${getValidationClass(emailBoxContent, emailInvalid)}`}
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    bind:value={emailBoxContent}
                    onchange={onChangeSignupText}
                    oninput={onChangeSignupText}
                    required
                  />
                  {#if emailInvalid && emailBoxContent}
                    <div class="invalid-feedback">
                      Please enter a valid email address.
                    </div>
                  {/if}
                </div>

                <div class="col-12">
                  <label class="form-label fw-semibold" for="displayName">Display Name</label>
                  <input
                    class="form-control form-control-lg"
                    id="displayName"
                    type="text"
                    placeholder={randomName}
                    bind:value={displayNameText}
                  />
                </div>

                <div class="col-12">
                  <label class="form-label fw-semibold" for="password">Password</label>
                  <input
                    class={`form-control form-control-lg ${getValidationClass(pwText, pwInvalid)}`}
                    id="password"
                    type="password"
                    placeholder="••••••••••••"
                    bind:value={pwText}
                    onchange={onChangeSignupText}
                    oninput={onChangeSignupText}
                    required
                  />
                  {#if pwInvalid && pwText}
                    <div class="invalid-feedback">
                      Password must be at least 8 characters with 1 uppercase, 1 number, and 1 special character (@$!%*#?&).
                    </div>
                  {/if}
                  {#if !pwInvalid && pwText}
                    <div class="valid-feedback">
                      Strong password (not stronger than your ego)
                    </div>
                  {/if}
                </div>

                <div class="col-12">
                  <label class="form-label fw-semibold" for="confirmPassword">Confirm Password</label>
                  <input
                    class={`form-control form-control-lg ${getValidationClass(confirmPwText, confirmPwInvalid)}`}
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••••••"
                    bind:value={confirmPwText}
                    onchange={onChangeSignupText}
                    oninput={onChangeSignupText}
                    required
                  />
                  {#if confirmPwInvalid && confirmPwText}
                    <div class="invalid-feedback">
                      Passwords do not match.
                    </div>
                  {/if}
                </div>

                <div class="col-12">
                  <label class="form-label fw-semibold" for="photoURL">Profile Photo URL</label>
                  <input
                    class="form-control form-control-lg"
                    id="photoURL"
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    bind:value={photoURLText}
                  />
                  <div class="form-text">Optional - provide a URL to your profile picture</div>
                </div>
              </div>

              <div class="form-check my-3">
                <input 
                  class="form-check-input" 
                  type="checkbox" 
                  id="agreeTerms" 
                  bind:checked={agreedToTerms}
                  required
                >
                <label class="form-check-label text-secondary" for="agreeTerms">
                  I agree to the <a href="#" class="text-primary">Terms and Conditions</a> and 
                  <a href="https://policies.google.com/privacy" class="text-primary">Privacy Policy</a>
                </label>
              </div>

              <div class="d-grid gap-3 mt-3">
                <button 
                  type="submit" 
                  class="btn btn-primary btn-lg shadow-sm"
                  disabled={!agreedToTerms}
                >
                  Create Account <Icon name="person-plus" />
                </button>
              </div>
            </form>

            <div class="mt-5 text-center">
              <p class="text-secondary">
                Already have an account? <a href="/login.html" class="fw-bold text-primary text-decoration-none">Sign in</a>
              </p>
            </div>
          </div>
        {/if}
      </div>

      <div class="hidden lg:block lg:w-1/2 relative bg-black">
        <img 
          class="absolute inset-0 w-full h-full object-cover opacity-90" 
          src={hedgehog} 
          alt="a hand drawn hedgehog"
          draggable="false"
        />
        <div class="absolute inset-0 bg-linear-to-l from-black/10 to-transparent"></div>
      </div>
    </div>
    <Footer />
  </Auth>
</div>

<style>
  :global(body), :global(html) {
    height: 100%;
    margin: 0;
  }
</style>