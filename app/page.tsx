
import { ThreeDMarqueeDemo } from "./3d-marquee";
import { ExpandableCardDemo } from "./gridlayout";
import { FloatingNavDemo } from "./navbar";
import { FocusCardsDemo } from "./focuscard";
import { ImagesSliderDemo } from "./auto-image-slider";
import { TextGenerateEffectDemo } from "./text-generate-effect";
import { TextGenerateEffectDemoAboutus } from "./text-generate-effect-aboutus";
import { LampDemo } from "./lamp";

export default function Landingpage() {
  return (
    <>
    <FloatingNavDemo/>
    <div>
      <section id="home">
        <LampDemo/>
      </section>

      <section id="about">
        <TextGenerateEffectDemoAboutus/>
        <ThreeDMarqueeDemo/>
      </section>

      <section id="content">
        <TextGenerateEffectDemo/>
        <FocusCardsDemo/>
      </section>
    </div>
    <ExpandableCardDemo/>
    <ImagesSliderDemo/>
    </>
  );
}
