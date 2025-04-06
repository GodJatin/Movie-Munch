"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { FlipWords } from "@/components/ui/flip-words";

const words = ["is Free", "Has No ads", "Provides Quality Content"];

export function ThreeDMarqueeDemo() {
  const images = [
    "null",
    "https://media.assettype.com/TNIE%2Fimport%2F2017%2F10%2F25%2Foriginal%2Fsalman_kjknokjhoi.jpg?w=480&auto=format%2Ccompress&fit=max",
    "https://m.timesofindia.com/photo/74807488/size-278535/74807488.jpg",
    "https://www.bollywoodhungama.com/wp-content/uploads/2021/07/Kalki-2898-AD1.jpg",
    "https://static.india.com/wp-content/uploads/2016/10/3-idiots.jpg?impolicy=Medium_Widthonly&w=400",
    "https://rukminim2.flixcart.com/image/850/1000/klzhq4w0/poster/t/q/x/medium-kgf-chaper-2-rocky-bhai-bullet-photoframe-with-acrylic-original-imagyzwmy5mntahj.jpeg?q=90&crop=false",
    "null",
    "null",
    "null",
    "https://preview.redd.it/first-look-posters-of-vijay-movies-since-2012-v0-40g483sv7i7b1.jpg?width=900&format=pjpg&auto=webp&s=92a0554bcce6711c7c17726cd1ea0ff94952cdac",
    "https://www.bollywoodhungama.com/wp-content/uploads/2022/08/Pushpa-2-The-Rule-CoverBanner1.jpg",
    "https://rukminim2.flixcart.com/image/850/1000/kms2j680/wallpaper/z/z/l/60-45-shahrukh-khan-wallpaper-for-room-18x24-inch-b14-hk-prints-original-imafc8jyeaujhgpd.jpeg?q=90&crop=false",
    "https://rukminim2.flixcart.com/image/850/1000/l0tweq80/poster/p/r/m/medium-smurfs-the-lost-village-on-fine-art-paper-hd-quality-original-imagcj8gxgtya3dg.jpeg?q=90&crop=false",
    "https://cdn.siasat.com/wp-content/uploads/2024/07/Tollywood.jpg",
    "https://www.boredpanda.com/blog/wp-content/uploads/2022/06/best-new-horror-movies-10-629739f60fd26__700.jpg",
    "https://rukminim2.flixcart.com/image/850/1000/kkwwu4w0/poster/p/e/o/extra-large-kung-fu-panda-cartoon-waterproof-vinyl-sticker-original-imagy5enm4ha57zf.jpeg?q=90&crop=false",
    "null",
    "https://preview.redd.it/first-look-posters-of-vijay-movies-since-2012-v0-40g483sv7i7b1.jpg?width=900&format=pjpg&auto=webp&s=92a0554bcce6711c7c17726cd1ea0ff94952cdac",
    "https://media.assettype.com/TNIE%2Fimport%2F2017%2F10%2F25%2Foriginal%2Fsalman_kjknokjhoi.jpg?w=480&auto=format%2Ccompress&fit=max",
    "https://media.licdn.com/dms/image/v2/D4D22AQECKpkkTNfv6w/feedshare-shrink_800/feedshare-shrink_800/0/1695103152079?e=2147483647&v=beta&t=MfA0yu4N7UPCZHeH0VkrKRRSCLqDExFmWmlUt_YQ7Ns",
    "https://files.prokerala.com/movies/pics/800/24-movie-posters-53659.jpg",
    "https://m.media-amazon.com/images/I/71niXI3lxlL.jpg",
    "https://cdn.kinocheck.com/i/ybn0vbfazw.jpg",
    "null",
    "null",
    "null",
    "null",
    "null",
    "null",
    "null",
  ];
  return (
    <div className="relative mx-auto my-10 flex h-screen w-full max-w-7xl flex-col items-center justify-center overflow-hidden rounded-3xl">
      <h2 className="relative z-20 mx-auto max-w-4xl text-center text-2xl font-bold text-balance text-white md:text-4xl lg:text-6xl">
        Movie Munch <br/><FlipWords words={words} /> <br />
      </h2>

      <div className="absolute inset-0 z-10 h-full w-full bg-black/80 dark:bg-black/40" />
      <ThreeDMarquee
        className="pointer-events-none absolute inset-0 h-full w-full"
        images={images}
      />
    </div>
  );
}
