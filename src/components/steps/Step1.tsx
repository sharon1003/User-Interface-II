import { ShapeSelector } from "../ShapeSelector";
import CustomizeButton from "../CustomizeButton";

interface Step1Props {
  shape: "almond" | "oval" | "squoval" | "coffin";
  setShape: (shape: "almond" | "oval" | "squoval" | "coffin") => void;
  t: (key: string) => string;
  handleNext: () => void;
}

const Step1 = ({ shape, setShape, t, handleNext }: Step1Props) => (
  <>
    <h2 className="text-xl font-semibold mb-2">{t("customize.step1")}</h2>
    <ShapeSelector selected={shape} onSelect={setShape} />
    <div className="mt-6 flex justify-center">
      <CustomizeButton
        onClick={handleNext}
        soundSrc="/sounds/next.wav"
        className="bg-black text-white"
      >
        {t("customize.next")}
      </CustomizeButton>
    </div>
  </>
);

export default Step1;
