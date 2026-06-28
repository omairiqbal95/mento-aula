"use client";

import React, { FormEvent, useMemo, useState } from "react";
import certificatesData from "@/content/certificates/certificates.json";
import styles from "./CertificateVerifier.module.css";

type Certificate = {
  code: string;
  studentName: string;
  courseName: string;
  issueDate: string;
  issuer: string;
  status: "valid" | "expired" | "revoked";
};

const certificates = certificatesData as Certificate[];

const CertificateVerifier = () => {
  const [code, setCode] = useState("");
  const [submittedCode, setSubmittedCode] = useState("");
  const [error, setError] = useState("");

  const certificate = useMemo(() => {
    if (!submittedCode) return null;
    return certificates.find(
      (item) => item.code.toUpperCase() === submittedCode.toUpperCase()
    );
  }, [submittedCode]);

  const handleCodeChange = (value: string) => {
    const normalizedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
    setCode(normalizedValue);
    setError("");
    setSubmittedCode("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!/^[A-Z0-9]{10}$/.test(code)) {
      setSubmittedCode("");
      setError("El código debe contener exactamente 10 caracteres alfanuméricos.");
      return;
    }

    setError("");
    setSubmittedCode(code);
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.introCard}>
            <span className={styles.kicker}>Verificación oficial</span>
            <h2>Comprueba la autenticidad de un certificado Mentoaula</h2>
            <p>
              Introduce el código único de 10 caracteres que aparece en el certificado.
              El sistema confirmará si el certificado existe y mostrará sus datos principales.
            </p>
            <div className={styles.helpBox}>
              <strong>¿Dónde encuentro el código?</strong>
              <span>
                Normalmente aparece en la parte inferior del certificado, junto al texto
                “Código de verificación”.
              </span>
            </div>
          </div>

          <div className={styles.formCard}>
            <form onSubmit={handleSubmit} noValidate>
              <label htmlFor="certificate-code">Código del certificado</label>
              <div className={styles.inputRow}>
                <input
                  id="certificate-code"
                  name="certificate-code"
                  type="text"
                  value={code}
                  onChange={(event) => handleCodeChange(event.target.value)}
                  placeholder="A1B2C3D4E5"
                  maxLength={10}
                  autoComplete="off"
                  aria-describedby="certificate-code-help"
                />
                <button type="submit">Verificar</button>
              </div>
              <p id="certificate-code-help" className={styles.inputHelp}>
                Solo letras y números. El código debe tener 10 caracteres.
              </p>
              {error && <p className={styles.error}>{error}</p>}
            </form>

            {submittedCode && certificate && certificate.status === "valid" && (
              <div className={`${styles.resultCard} ${styles.success}`}>
                <span className={styles.resultIcon}>✓</span>
                <div>
                  <h3>Certificado válido</h3>
                  <dl>
                    <div>
                      <dt>Alumno</dt>
                      <dd>{certificate.studentName}</dd>
                    </div>
                    <div>
                      <dt>Curso</dt>
                      <dd>{certificate.courseName}</dd>
                    </div>
                    <div>
                      <dt>Fecha de emisión</dt>
                      <dd>{certificate.issueDate}</dd>
                    </div>
                    <div>
                      <dt>Código</dt>
                      <dd>{certificate.code}</dd>
                    </div>
                    <div>
                      <dt>Entidad emisora</dt>
                      <dd>{certificate.issuer}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}

            {submittedCode && (!certificate || certificate.status !== "valid") && (
              <div className={`${styles.resultCard} ${styles.invalid}`}>
                <span className={styles.resultIcon}>!</span>
                <div>
                  <h3>Certificado no encontrado</h3>
                  <p>
                    Revisa que el código esté escrito correctamente. Si el problema continúa,
                    contacta con Mentoaula para confirmar la información.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificateVerifier;
