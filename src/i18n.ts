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
                        uploadSticker: "Upload Image",
                        myStickers: "My Own Stickers",
                        onlyImagesAllowed: "Only Images Allowed",
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
                        pay: "Go to Checkout"
                    },
                    payment: {
                        title: "Payment",
                        method: "Choose Payment Method",
                        total: "Total",
                        payNow: "Pay Now",
                        swishPhone: "Swish Phone Number",
                    }
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
                        uploadSticker: "Tải lên hình ảnh",
                        myStickers: "Hình dán của riêng tôi",
                        onlyImagesAllowed: "Chỉ cho phép hình ảnh",
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
                        pay: "Đi tới thanh toán",
                    },
                    payment: {
                        title: "Thanh toán",
                        method: "Chọn phương thức thanh toán",
                        total: "Tổng cộng",
                        payNow: "Thanh toán",
                        swishPhone: "Số điện thoại Swish",
                    }
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
                        uploadSticker: "Ladda upp bild",
                        myStickers: "Mina egna klistermärken",
                        onlyImagesAllowed: "Endast bilder tillåtna",
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
                        pay: "Gå till kassa",
                    },
                    payment: {
                        title: "Betalning",
                        method: "Välj betalningsmetod",
                        total: "Totalt",
                        payNow: "Betala nu",
                        swishPhone: "Swish-telefonnummer",
                    }
                },
            },
            zh: {
                common: {
                    navbar: {
                        home: "首頁",
                        shop: "商店",
                        customize: "客製化"
                    },
                    home: {
                        welcome: "歡迎來到 Nail Shop",
                        ourProduct: "我們的產品",
                        description: "透過我們最受歡迎的美甲服務，發現你最喜歡的風格。",
                        gel: {
                            title: "光療美甲",
                            description: "持久亮麗，提供多種季節性和經典顏色選擇。"
                        },
                        natural: {
                            title: "自然護理",
                            description: "使用我们的有機護理產品滋養你的指甲和甲緣。"
                        },
                        art: {
                            title: "美甲藝術",
                            description: "從極簡到大膽，用定制美甲展現你的個性。"
                        }
                    },
                    footer: {
                        quickLinks: "快速連結",
                        howToApply: "如何使用",
                        customize: "客製化你的美甲",
                        faqs: "常見問題",
                        aboutUs: "關於我們",
                        moreInfo: "更多資訊",
                        terms: "服務條款",
                        contactUs: "聯絡我們"
                    },
                    shop: {
                        ourProducts: "我們的產品",
                        categories: {
                            all: "全部",
                            gelmanicure: "光療美甲",
                            nailart: "美甲藝術",
                            naturalcare: "自然護理"
                        }
                    },
                    customize: {
                        title: "設計你的美甲",
                        step1: "步驟 1：選擇指甲形狀",
                        shapes: {
                            almond: "杏仁形",
                            oval: "橢圓型",
                            squoval: "方橢圓型",
                            coffin: "棺材形"
                        },
                        next: "下一步",
                        step2: "步驟 2：選擇長度",
                        lengths: {
                            short: "短",
                            medium: "中等",
                            long: "長"
                        },
                        back: "返回",
                        step3: "步驟 3：選擇颜色",
                        step4: "步驟 4：選擇贴纸",
                        previewTitle: "即時預覽",
                        previewDescription: "您定義的美甲預覽圖",
                        undo: "回到上一步",
                        redo: "重做",
                        uploadSticker: "上傳圖片",
                        myStickers: "我自己的贴纸",
                        onlyImagesAllowed: "僅允許圖片",
                        step4Sum: "步驟4：摘要",
                        submit: "提交",
                        savePreview: "保存預覽圖",
                        shape: "形狀",
                        length: "長度",
                        color: "顏色",
                    },
                    product: {
                        addToCart: "加入購物車"
                    },
                    cart: {
                        title: "購物車",
                        empty: "您的購物車是空的。",
                        total: "總計",
                        pay: "前往結帳",
                    },
                    payment: {
                        title: "付款",
                        method: "選擇支付方式",
                        total: "總計",
                        payNow: "立即支付",
                        swishPhone: "Swish 手機號碼",
                    }
                },
            },
        },
    });

export default i18n;