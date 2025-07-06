// Auth Types
export interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

export interface OTPFormData {
  email: string;
  otp: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: UserData;
}

export interface UserData {
  _id: string;
  name: string;
  email: string;
  verified: boolean;
}

export interface SessionData {
  token: string;
  userId: UserData | string;
  sessionId: string;
}

// User Context Types
export interface User {
  user: boolean;
  userId: string | null;
  userData?: UserData;
}

export interface AuthContextType {
  user: User;
  setUser: (user: User) => void;
  isLoading: boolean;
  logout: () => Promise<void>;
}

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
        slidesToShow: 1.3,
        slidesToScroll: 1,
      },
    },
  ],
};

// Book Types
export interface BookInfo {
  _id: string;
  volumeInfo: VolumeInfo;
  searchInfo: SearchInfo;
}

export interface VolumeInfo {
  price: string;
  category: "free" | "paid";
  title: string;
  subtitle?: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  pageCount: number;
  categories: string[];
  imageLinks: ImageLinks;
  language: string;
}

export interface ImageLinks {
  thumbnail: string;
  small?: string;
  medium?: string;
  large?: string;
}

export interface SearchInfo {
  textSnippet: string;
}

// Component Props Types
export interface CardProps {
  item: BookInfo;
}

export interface LoadingState {
  isLoading: boolean;
  error?: Error | null;
}

// Hook Return Types
export interface UseBookReturn extends LoadingState {
  data: BookInfo[];
}

export interface UseMutationReturn<TData, TError, TVariables> {
  mutateAsync: (variables: TVariables) => Promise<TData>;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  data?: TData;
  error?: TError;
}
