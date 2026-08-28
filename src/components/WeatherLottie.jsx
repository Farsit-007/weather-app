import { LottieLight } from "lottie-react";

/*
  Plays one animation file from the public/animations folder.
  The file name matches `name`, so no lookup table is needed.
*/
export default function WeatherLottie({ kind, name, className = "" }) {
  return (
    <LottieLight src={`/animations/${kind}/${name}.json`} className={className} autoplay loop />
  );
}
