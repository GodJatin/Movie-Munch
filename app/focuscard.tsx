import { FocusCards } from "@/components/ui/focus-cards";


export function FocusCardsDemo() {
  const cards = [
    {
      title: "Action",
      src: "https://files.oaiusercontent.com/file-15ukBRZPYQFZvZvScyQKcv?se=2025-03-24T03%3A00%3A30Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3De9687d0a-df21-4b00-9a9c-5f3f419a879f.webp&sig=L4sHTegFFiCr1v57QazHQXIsNyKWEqj913tj7wGcdvU%3D",
    },
    {
      title: "Adventure",
      src: "https://media1.thehungryjpeg.com/thumbs2/ori_3618696_ndd9deimphxv1ck19grhgzqvpk98473esbxzkrxy_adventure-font-and-camping-pack.jpg",
    },
    {
      title: "Animation",
      src: "https://files.oaiusercontent.com/file-69dx2tq2jF3R6jrc5UEWwX?se=2025-03-24T03%3A05%3A09Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Ddcee3834-9208-4689-9802-f14de1be996d.webp&sig=SMPgMNg5n4iVA9VUGSvj/1N2eaFg4gkwnNMh143ARsE%3D",
    },
    {
      title: "Comedy",
      src: "https://files.oaiusercontent.com/file-6FdPtmtPxxTe8aZcSisMy9?se=2025-03-24T03%3A04%3A32Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dc1cd77d7-022f-4e0d-8df4-f37f043c3ccf.webp&sig=97YCOd7zpWvOaYCwCv%2Bg229kvDW7Tz7o1WnWAH1GOv4%3D",
    },
    {
      title: "Romance",
      src: "https://images.unsplash.com/photo-1507041957456-9c397ce39c97?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Crime",
      src: "https://files.oaiusercontent.com/file-3Pzo51NwFSdywtkwxP4j3B?se=2025-03-24T03%3A02%3A07Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Df063a2cb-687f-4e0d-849e-f9ec0df22cde.webp&sig=PcY1sE%2BCgZS7nRFsiG9y42qp6dcZN6199c0O%2BDyb7Cc%3D",
    },
    {
      title: "Horror",
      src: "https://files.oaiusercontent.com/file-3D6vePXJSnux4nEfbL6utC?se=2025-03-24T02%3A58%3A15Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Df7adc81f-4380-4a56-90fc-c223a21d3b11.webp&sig=ajQEgGK%2BHST17AY20P6ZVKVnYveK7IDWXVkwkzdAp4A%3D",
    },
    {
      title: "Documentary",
      src: "https://files.oaiusercontent.com/file-1x6aTYovkiRug3zrSpkFK3?se=2025-03-24T03%3A06%3A03Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D203f8db8-8303-4a31-9c60-90cf9bf52338.webp&sig=cgEbgmRH7UgjaG97cVtkRUcr3wuSPYuNObvy8o10%2BHU%3D",
    },
    {
      title: "Drama",
      src: "https://files.oaiusercontent.com/file-WCNHYtTTqMMjz6QCxA4yf8?se=2025-03-24T03%3A07%3A12Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Db70e387d-be0b-4a09-bfea-b2554d8f164e.webp&sig=Roy27Uwyw4/RY7V3Z63M0N7O9bROYePneOYdhcXNpXU%3D",
    },
    {
      title: "Science Ficition",
      src: "https://files.oaiusercontent.com/file-4AoTUEeu5JDo6gCNi7abWY?se=2025-03-24T03%3A09%3A01Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D848514dd-e133-43c9-adac-26d5e5c1ad45.webp&sig=LTK5UoXE8SDFhg0pnyLhUryx7IB1%2Bg4ceBnB9rhAwzQ%3D",
    },
    {
      title: "Fantasy",
      src: "https://files.oaiusercontent.com/file-DyEYc1RVjRgpE7sBCWxYmX?se=2025-03-24T03%3A09%3A52Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D97618e9f-c485-4402-8895-c1b7ceded643.webp&sig=ulYEdkUFHV0pK7Ln9HuPmlg8JAYyQb3dM%2BFSL%2Bxd5PI%3D",
    },
    {
      title: "Western",
      src: "https://assets.aceternity.com/the-first-rule.png",
    },
    {
      title: "Thriller",
      src: "https://cdn.siasat.com/wp-content/uploads/2024/07/Tollywood.jpg",
    },
    {
      title: "Cyberpunk & Derivatives",
      src: "https://images.unsplash.com/photo-1600271772470-bd22a42787b3?q=80&w=3072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Melodrama",
      src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=3070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Fairy Tail",
      src: "https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Biography",
      src: "https://images.unsplash.com/photo-1507041957456-9c397ce39c97?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Devotional",
      src: "https://assets.aceternity.com/the-first-rule.png",
    },
  ];

  return <FocusCards cards={cards} />;
}
