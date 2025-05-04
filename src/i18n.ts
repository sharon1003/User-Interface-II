import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        supportedLngs: ["en", "vi", "sv", "zh"],
        defaultNS: "common",
        interpolation: { escapeValue: false },
        debug: import.meta.env.DEV,
        resources: {
            en: {
                common: {
                    navbar: {
                        home: "Home",
                        shop: "Shop",
                        customize: "Customize"
                    },
                    home: {
                        welcome: "Welcome to Nail Shop",
                        ourProduct: "Our Product",
                        description: "Discover your favorite styles with our most popular nail services.",
                        gel: {
                            title: "Gel Manicure",
                            description: "Long-lasting, glossy finish with a range of seasonal and classic colors."
                        },
                        natural: {
                            title: "Natural Care",
                            description: "Nourish your nails and cuticles with our organic treatments."
                        },
                        art: {
                            title: "Nail Art",
                            description: "From minimalist to bold, express your personality with custom nail art."
                        }
                    },
                    footer: {
                        quickLinks: "QUICK LINKS",
                        howToApply: "How to Apply",
                        customize: "Customize Your Nails",
                        faqs: "FAQs",
                        aboutUs: "About Us",
                        moreInfo: "MORE INFO",
                        terms: "Terms of Service",
                        contactUs: "CONTACT US"
                    },
                    shop: {
                        ourProducts: "Our Products",
                        categories: {
                            all: "All",
                            gelmanicure: "Gel Manicure",
                            nailart: "Nail Art",
                            naturalcare: "Natural Care"
                        }
                    },
                    customize: {
                        title: "Design Your Press-On Nails",
                        step1: "Step 1: Choose Shape",
                        shapes: {
                            almond: "Almond",
                            oval: "Round/Oval",
                            squoval: "Squoval",
                            coffin: "Coffin"
                        },
                        next: "Next",
                        step2: "Step 2: Choose Length",
                        lengths: {
                            short: "Short",
                            medium: "Medium",
                            long: "Long"
                        },
                        back: "Back",
                        step3: "Step 3: Choose Color",
                        step4: "Step 4: Choose a Sticker",
                        previewTitle: "Live Preview",
                        previewDescription: "Your customized nail preview",
                        undo: "Undo",
                        redo: "Redo",
                        step4Sum: "Step 4: Summary",
                        submit: "Submit",
                        savePreview: "Save Preview",
                        shape: "Shape",
                        length: "Length",
                        color: "Color",
                    },
                    product: {
                        addToCart: "Add to Cart"
                    },
                    cart: {
                        title: "Cart",
                        empty: "Your cart is empty.",
                        total: "Total",
                        pay: "Pay Now"
                    },
                },
            },
            vi: {
                common: {
                    navbar: {
                        home: "Trang chủ",
                        shop: "Cửa hàng",
                        customize: "Tùy chỉnh"
                    },
                    home: {
                        welcome: "Chào mừng đến với Nail Shop",
                        ourProduct: "Sản phẩm của chúng tôi",
                        description: "Khám phá phong cách yêu thích của bạn với các dịch vụ làm móng phổ biến nhất của chúng tôi.",
                        gel: {
                            title: "Sơn Gel",
                            description: "Bóng đẹp và bền lâu với nhiều màu sắc theo mùa và cổ điển."
                        },
                        natural: {
                            title: "Chăm sóc tự nhiên",
                            description: "Nuôi dưỡng và chăm sóc móng với các liệu pháp hữu cơ của chúng tôi."
                        },
                        art: {
                            title: "Nghệ thuật vẽ móng",
                            description: "Từ tối giản đến nổi bật, thể hiện cá tính của bạn với nghệ thuật vẽ móng tùy chỉnh."
                        }
                    },
                    footer: {
                        quickLinks: "LIÊN KẾT NHANH",
                        howToApply: "Cách sử dụng",
                        customize: "Thiết kế móng của bạn",
                        faqs: "Câu hỏi thường gặp",
                        aboutUs: "Về chúng tôi",
                        moreInfo: "THÊM THÔNG TIN",
                        terms: "Điều khoản dịch vụ",
                        contactUs: "LIÊN HỆ"
                    },
                    shop: {
                        ourProducts: "Sản phẩm của chúng tôi",
                        categories: {
                            all: "Tất cả",
                            gelmanicure: "Sơn Gel",
                            nailart: "Nghệ thuật vẽ móng",
                            naturalcare: "Chăm sóc tự nhiên"
                        }
                    },
                    customize: {
                        title: "Thiết kế móng tay theo cách của bạn",
                        step1: "Bước 1: Chọn hình dạng móng",
                        shapes: {
                            almond: "Hạnh nhân",
                            oval: "Bầu dục",
                            squoval: "Vuông bầu",
                            coffin: "Quan tài"
                        },
                        next: "Tiếp theo",
                        step2: "Bước 2: Chọn độ dài",
                        lengths: {
                            short: "Ngắn",
                            medium: "Trung bình",
                            long: "Dài"
                        },
                        back: "Quay lại",
                        step3: "Bước 3: Chọn màu sắc",
                        step4: "Bước 4: Chọn sticker",
                        previewTitle: "Xem trước trực tiếp",
                        previewDescription: "Bản xem trước móng tay bạn đã tùy chỉnh",
                        undo: "Hoàn tác",
                        redo: "Làm lại",
                        step4Sum: "Bước 4: Tóm tắt",
                        submit: "Gửi",
                        savePreview: "Lưu bản xem trước",
                        shape: "Hình dáng",
                        length: "Độ dài",
                        color: "Màu sắc",
                    },
                    product: {
                        addToCart: "Thêm vào giỏ hàng"
                    },
                    cart: {
                        title: "Giỏ hàng",
                        empty: "Giỏ hàng của bạn đang trống.",
                        total: "Tổng cộng",
                        pay: "Thanh toán",
                    },
                },
            },
            sv: {
                common: {
                    navbar: {
                        home: "Hem",
                        shop: "Butik",
                        customize: "Anpassa"
                    },
                    home: {
                        welcome: "Välkommen till Nail Shop",
                        ourProduct: "Våra produkter",
                        description: "Upptäck dina favoritstilar med våra mest populära nagelbehandlingar.",
                        gel: {
                            title: "Gellack",
                            description: "Hållbar, glansig finish med ett utbud av säsongsbetonade och klassiska färger."
                        },
                        natural: {
                            title: "Naturlig vård",
                            description: "Vårda dina naglar och nagelband med våra ekologiska behandlingar."
                        },
                        art: {
                            title: "Nagelkonst",
                            description: "Från minimalistiskt till djärvt – uttryck din personlighet med anpassad nagelkonst."
                        }
                    },
                    footer: {
                        quickLinks: "SNABBLÄNKAR",
                        howToApply: "Hur man applicerar",
                        customize: "Anpassa dina naglar",
                        faqs: "Vanliga frågor",
                        aboutUs: "Om oss",
                        moreInfo: "MER INFORMATION",
                        terms: "Användarvillkor",
                        contactUs: "KONTAKTA OSS"
                    },
                    shop: {
                        ourProducts: "Våra produkter",
                        categories: {
                            all: "Alla",
                            gelmanicure: "Gellack",
                            nailart: "Nagelkonst",
                            naturalcare: "Naturlig vård"
                        }
                    },
                    customize: {
                        title: "Designa dina press-on naglar",
                        step1: "Steg 1: Välj form",
                        shapes: {
                            almond: "Mandel",
                            oval: "Oval",
                            squoval: "Fyrkantig oval",
                            coffin: "Kistform"
                        },
                        next: "Nästa",
                        step2: "Steg 2: Välj längd",
                        lengths: {
                            short: "Kort",
                            medium: "Medellång",
                            long: "Lång"
                        },
                        back: "Tillbaka",
                        step3: "Steg 3: Välj färg",
                        step4: "Steg 4: Välj en klistermärke",
                        previewTitle: "Förhandsvisning",
                        previewDescription: "Din anpassade nagel visas här",
                        undo: "Ångra",
                        redo: "Gör om",
                        step4Sum: "Steg 4: Sammanfattning",
                        submit: "Skicka",
                        savePreview: "Spara förhandsvisning",
                        shape: "Form",
                        length: "Längd",
                        color: "Färg",
                    },
                    product: {
                        addToCart: "Lägg till i kundvagnen"
                    },
                    cart: {
                        title: "Kundvagn",
                        empty: "Din kundvagn är tom.",
                        total: "Totalt",
                        pay: "Betala",
                    },
                },
            },
            zh: {
                common: {
                    navbar: {
                        home: "主页",
                        shop: "商店",
                        customize: "自定义"
                    },
                    home: {
                        welcome: "欢迎来到 Nail Shop",
                        ourProduct: "我们的产品",
                        description: "通过我们最受欢迎的美甲服务，发现你最喜欢的风格。",
                        gel: {
                            title: "光疗美甲",
                            description: "持久亮丽，提供多种季节性和经典颜色选择。"
                        },
                        natural: {
                            title: "自然护理",
                            description: "使用我们的有机护理产品滋养你的指甲和甲缘。"
                        },
                        art: {
                            title: "美甲艺术",
                            description: "从极简到大胆，用定制美甲展现你的个性。"
                        }
                    },
                    footer: {
                        quickLinks: "快速链接",
                        howToApply: "如何使用",
                        customize: "自定义你的美甲",
                        faqs: "常见问题",
                        aboutUs: "关于我们",
                        moreInfo: "更多信息",
                        terms: "服务条款",
                        contactUs: "联系我们"
                    },
                    shop: {
                        ourProducts: "我们的产品",
                        categories: {
                            all: "全部",
                            gelmanicure: "光疗美甲",
                            nailart: "美甲艺术",
                            naturalcare: "自然护理"
                        }
                    },
                    customize: {
                        title: "设计你的按压美甲",
                        step1: "步骤 1：选择指甲形状",
                        shapes: {
                            almond: "杏仁形",
                            oval: "椭圆形",
                            squoval: "方椭圆形",
                            coffin: "棺材形"
                        },
                        next: "下一步",
                        step2: "步骤 2：选择长度",
                        lengths: {
                            short: "短",
                            medium: "中等",
                            long: "长"
                        },
                        back: "返回",
                        step3: "步骤 3：选择颜色",
                        step4: "步骤 4：选择贴纸",
                        previewTitle: "实时预览",
                        previewDescription: "您自定义的美甲预览",
                        undo: "撤销",
                        redo: "重做",
                        step4Sum: "步骤4：摘要",
                        submit: "提交",
                        savePreview: "保存预览",
                        shape: "形状",
                        length: "长度",
                        color: "颜色",
                    },
                    product: {
                        addToCart: "加入购物车"
                    },
                    cart: {
                        title: "购物车",
                        empty: "您的购物车是空的。",
                        total: "总计",
                        pay: "立即支付",
                    },
                },
            },
        },
    });

export default i18n;