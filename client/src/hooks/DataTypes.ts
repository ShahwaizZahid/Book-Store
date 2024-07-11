export type SignupFormData = {
  name: string;
  email: string;
  password: string;
};

export type OTPFormData = {
  email: string;
  otp: string;
};
export type LoginFormData = {
  email: string;
  password: string;
};

export const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4.5,
  slidesToScroll: 3,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3.5,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2.5,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
