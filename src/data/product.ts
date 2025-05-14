export type ProductData = {
    id: string;
    category: string;
    image: string;
    price: string;
    translations: {
        [lang: string]: {
            title: string;
            description: string;
        };
    };
};
export const allProducts: ProductData[] = [
    {
        id: "sunset_ombre",
        category: "gelmanicure",
        image: "/images/gel/sunset.jpg",
        price: "$9.99",
        translations: {
            en: {
                title: "Sunset Ombre",
                description: "Gradient finish from orange to pink.",
            },
            vi: {
                title: "Ombre Hoàng hôn",
                description: "Hiệu ứng chuyển màu từ cam sang hồng.",
            },
            sv: {
                title: "Solnedgångsombre",
                description: "Färgovergång från orange till rosa.",
            },
            zh: {
                title: "日落漸變",
                description: "從橘色到粉紅色的漸層效果。",
            }
        }
    },
    {
        id: "glossy_wine_red",
        category: "gelmanicure",
        image: "/images/gel/wine-red.jpg",
        price: "$10.50",
        translations: {
            en: {
                title: "Glossy Wine Red",
                description: "Bold and confident, perfect for formal occasions.",
            },
            vi: {
                title: "Đỏ rượu bóng loáng",
                description: "Màu sắc đậm nét và tự tin, lý tưởng cho các dịp trang trọng.",
            },
            sv: {
                title: "Glansigt vinröd",
                description: "Djärv och självsäker – perfekt för formella tillfällen.",
            },
            zh: {
                title: "光澤酒紅",
                description: "大膽自信，適合正式場合的理想選擇。",
            },
        }
    },
    {
        id: "aloe_vera",
        category: "naturalcare",
        image: "/images/natural/aloe.jpg",
        price: "$19.99",
        translations: {
            en: {
                title: "Aloe Vera Therapy",
                description: "Soothing and hydrating treatment.",
            },
            vi: {
                title: "Liệu pháp Lô Hội",
                description: "Liệu pháp làm dịu và dưỡng ẩm cho móng tay.",
            },
            sv: {
                title: "Aloe Vera-behandling",
                description: "Lugnande och återfuktande behandling.",
            },
            zh: {
                title: "蘆薈護理",
                description: "舒緩和保濕的護理方案。",
            },
        }
    },

    {
        id: "green_tea",
        category: "naturalcare",
        image:"/images/natural/green-tea.jpg",
        price:"$22.50",
        translations: {
            en: {
                title: "Green Tea Shield",
                description: "Antioxidant-rich gel with a fresh, calming scent.",
            },
            vi: {
                title: "Lớp bảo vệ trà xanh",
                description: "Gel giàu chất chống oxy hóa với hương thơm tươi mát, dịu nhẹ.",
            },
            sv: {
                title: "Grönt te-sköld",
                description: "Antioxidantrik gel med en fräsch och lugnande doft.",
            },
            zh: {
                title: "綠茶防護",
                description: "富含抗氧化劑的凝膠，具有清新舒緩的香氣。",
            },
        }
    },
    {
        id: "pastel_garden",
        category: "naturalcare",
        image: "/images/gel/pastel-garden.jpg",
        price: "$12.99",
        translations: {
            en: {
                title: "Pastel Garden",
                description: "Mix of pastel colors with flower-inspired accents.",
            },
            vi: {
                title: "Khu vườn Pastel",
                description: "Sự kết hợp của màu pastel nhẹ nhàng và họa tiết lấy cảm hứng từ hoa.",
            },
            sv: {
                title: "Pastellträdgård",
                description: "En blandning av pastellfärger med blom-inspirerade accenter.",
            },
            zh: {
                title: "粉彩花園",
                description: "結合粉彩色彩與花卉靈感的點綴設計。",
            },
        }
    },

    {
        id: "galaxy_sparkle",
        category: "nailart",
        image: "/images/nailart/galaxy.jpg",
        price: "$12.99",
        translations: {
            en: {
                title: "Galaxy Sparkle",
                description: "Starry nails with sparkles.",
            },
            vi: {
                title: "Lấp lánh dải ngân hà",
                description: "Móng tay lấp lánh như bầu trời đầy sao.",
            },
            sv: {
                title: "Galaxglitter",
                description: "Stjärnklara naglar med glittrande effekt.",
            },
            zh: {
                title: "銀河閃耀",
                description: "如星空般閃亮的美甲設計。",
            },
        }
    },
];
