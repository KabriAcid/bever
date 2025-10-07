// Tell TypeScript's JSX that a <lottie-player> element exists (web component from LottieFiles)
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "lottie-player": any;
    }
  }
}

export {};
