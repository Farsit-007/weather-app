import { LottieLight } from "lottie-react";

/*
  Shows the one-line advice under the weather card, e.g. "take an umbrella".

  Raw version: nothing is passed in. #3b82f6 is the colour of the "rain" advice
  and bg-rec-rain its pale card background; the other types (hot, warm, cold,
  sunny, snow, fog, cloudy, pleasant) have a colour and a bg-rec-* class of
  their own, and an animation of the same name in /animations/advice.
*/
export default function RecommendationCard() {
  return (
    <section
      className="flex items-start gap-[18px] w-full rounded-card border-l-[5px] border-solid shadow-md-soft p-7 max-[480px]:p-5 transition-transform duration-200 hover:-translate-y-1 animate-rise [animation-delay:160ms] bg-rec-rain"
      style={{ borderLeftColor: "#3b82f6" }}
    >
      <span className="inline-flex items-center justify-center w-[64px] h-[64px] rounded-[20px] bg-white/90 ring-1 ring-white shadow-sm-soft flex-shrink-0">
        <LottieLight src="/animations/advice/rain.json" className="w-[46px] h-[46px]" autoplay loop />
      </span>
      <div>
        <div className="flex items-center gap-3 mb-2 max-[480px]:flex-wrap">
          <span
            className="text-[11px] font-bold uppercase tracking-widebadge text-white rounded-full px-3 py-1"
            style={{ background: "#3b82f6" }}
          >
            Rain Alert
          </span>
          <h3 className="text-[12.5px] font-bold tracking-widelabel3 uppercase text-slate m-0">
            Your smart suggestion
          </h3>
        </div>
        <p className="text-[17.5px] font-semibold leading-[1.55] text-navy m-0">
          It's raining. Don't forget to take an umbrella with you.
        </p>
      </div>
    </section>
  );
}
