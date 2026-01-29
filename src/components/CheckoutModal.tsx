import { useEffect, useMemo, useState } from "react";
import { FiX } from "react-icons/fi";
import { useEscape } from "../hooks/useEscape";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";
import { formatPrice } from "../utils/formatPrice";

type Props = {
  open: boolean;
  onClose: () => void;
  total: number;
  totalCount: number;
};

type Method = "sbp" | "cardOnDelivery" | "newCard";

function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExp(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
}

function formatCvv(value: string) {
  return value.replace(/\D/g, "").slice(0, 4);
}

export function CheckoutModal({ open, onClose, total, totalCount }: Props) {
  const [method, setMethod] = useState<Method>("sbp");

  const [cardNumber, setCardNumber] = useState("");
  const [exp, setExp] = useState("");
  const [cvv, setCvv] = useState("");

  useEscape(onClose, open);
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    setMethod("sbp");
    setCardNumber("");
    setExp("");
    setCvv("");
  }, [open]);

  const formattedTotal = useMemo(() => formatPrice(total), [total]);

  const canSubmitNewCard = useMemo(() => {
    const digits = cardNumber.replace(/\D/g, "");
    const expOk = /^\d{2}\/\d{2}$/.test(exp.trim());
    const cvvOk = /^\d{3,4}$/.test(cvv.trim());
    return digits.length === 16 && expOk && cvvOk;
  }, [cardNumber, exp, cvv]);

  const primaryBtnDisabled = method === "newCard" ? !canSubmitNewCard : false;
  const primaryBtnText = method === "newCard" ? "Добавить карту" : "Выбрать";

  const onOverlayClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const submit = () => {
    const label =
      method === "sbp"
        ? "СБП"
        : method === "cardOnDelivery"
        ? "Картой при получении"
        : "Новая карта";

    alert(`Оплата: ${label}\nТоваров: ${totalCount}\nСумма: ${formattedTotal}`);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="modalOverlay" onMouseDown={onOverlayClick} role="presentation">
      <div className="modalCard" role="dialog" aria-modal="true" aria-label="Оплата">
        <div className="modalHeader">
          <div className="modalTitle">Способы оплаты</div>

          <button
            type="button"
            className="modalCloseBtn"
            onClick={onClose}
            aria-label="Закрыть"
            title="Закрыть"
            autoFocus
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="modalBody">
          <button
            type="button"
            className={`payRow ${method === "sbp" ? "payRowActive" : ""}`}
            onClick={() => setMethod("sbp")}
          >
            <div className="payLeft">
              <div className="payIconBox">СПБ</div>
              <div className="payText">Системой быстрых платежей</div>
            </div>

            <div className={`payRadio ${method === "sbp" ? "payRadioOn" : ""}`} />
          </button>

          <button
            type="button"
            className={`payRow ${method === "cardOnDelivery" ? "payRowActive" : ""}`}
            onClick={() => setMethod("cardOnDelivery")}
          >
            <div className="payLeft">
              <div className="payIconBox">💳</div>
              <div className="payText">Картой при получении</div>
            </div>

            <div className={`payRadio ${method === "cardOnDelivery" ? "payRadioOn" : ""}`} />
          </button>

          <button
            type="button"
            className={`payRow ${method === "newCard" ? "payRowActive" : ""}`}
            onClick={() => setMethod("newCard")}
          >
            <div className="payLeft">
              <div className="payIconBox">＋</div>
              <div className="payText">Новой картой</div>
            </div>

            <div className={`payRadio ${method === "newCard" ? "payRadioOn" : ""}`} />
          </button>

          <div className="payDetails">
            {method === "sbp" ? (
              <div className="detailsCard">
                <div className="detailsTitle">Оплата по СБП</div>
                <div className="detailsSub">
                  Откройте приложение банка и оплатите по QR-коду.
                </div>

                <div className="sbpQrBox" aria-label="QR">
                  QR
                </div>

                <div className="detailsHint">
                  После оплаты заказ будет подтверждён автоматически.
                </div>
              </div>
            ) : null}

            {method === "cardOnDelivery" ? (
              <div className="detailsCard">
                <div className="detailsTitle">Оплата при получении</div>
                <div className="detailsSub">
                  Оплатите картой при вручении заказа курьером/в пункте выдачи.
                </div>
              </div>
            ) : null}

            {method === "newCard" ? (
              <div className="detailsCard">
                <div className="detailsTitle">Добавьте карту любого банка</div>

                <div className="cardForm">
                  <label className="field">
                    <input
                      className="fieldInput"
                      inputMode="numeric"
                      placeholder="0000 0000 0000 0000"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    />
                  </label>

                  <div className="fieldRow">
                    <label className="field">
                      <input
                        className="fieldInput"
                        inputMode="numeric"
                        placeholder="ММ/ГГ"
                        value={exp}
                        onChange={(e) => setExp(formatExp(e.target.value))}
                      />
                    </label>

                    <label className="field">
                      <input
                        className="fieldInput"
                        type="password"
                        inputMode="numeric"
                        placeholder="***"
                        value={cvv}
                        onChange={(e) => setCvv(formatCvv(e.target.value))}
                      />
                    </label>
                  </div>

                  <div className="cardFormNote">
                    Добавляя карту, вы соглашаетесь с{" "}
                    <a
                      href="https://i.pinimg.com/736x/cb/1c/5e/cb1c5e4312c8cacda6e4d3a1222724c6.jpg"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Условиями.
                    </a>
                  </div>

                  <div className="cardFormHint">
                    Для проверки спишем и вернём небольшую сумму.
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <button
            type="button"
            className={`payPrimaryBtn ${primaryBtnDisabled ? "payPrimaryBtnDisabled" : ""}`}
            disabled={primaryBtnDisabled}
            onClick={submit}
          >
            {primaryBtnText}
            {method !== "newCard" ? (
              <span className="payPrimarySum">{formattedTotal}</span>
            ) : null}
          </button>
        </div>
      </div>
    </div>
  );
}
