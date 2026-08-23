import { LottieLight } from "lottie-react";

/*
  Plays one animation file from the public/animations folder.

  These are real Lottie animations (the format After Effects exports and
  lottie-react plays), taken from the free Meteocons pack by Bas Milius:
  https://github.com/basmilius/meteocons — MIT licensed, the notice is kept in
  public/animations/LICENSE.txt.

  The file names are chosen so that no lookup table is needed anywhere:

    kind="weather"  the file name is the `icon` from weatherService.js
                    (clear, clear_night, partly_cloudy, cloudy, fog, rain,
                     snow, storm)
    kind="advice"   the file name is the `type` from weatherRecommendation.js
                    (hot, warm, cold, sunny, rain, snow, fog, cloudy, pleasant)

  So <WeatherLottie kind="weather" name={weather.icon} /> always finds its file.

  The animation fills the box around it, so the caller sets the size of that box
  with normal Tailwind classes, e.g. className="w-[260px] h-[260px]".
*/
export default function WeatherLottie({ kind, name, className = "" }) {
  return (
    <LottieLight src={`/animations/${kind}/${name}.json`} className={className} autoplay loop />
  );
}
