import { useState } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { safeNumber, safeString, safeArray, safeObject } from "../lib/formatters";
import { CitizenFormModal } from "@/features/citizen-form"

const formatDate = (date) => {
  if (!date) return "—";
  try {
    return format(new Date(date), "d MMMM yyyy", { locale: ru });
  } catch {
    return date;
  }
};

export const CitizenCard = ({ citizen }) => {
  if (!citizen) return null;

  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen)

  const documents = safeObject(citizen.documents);
  const health = safeObject(citizen.health);

  return (
    <>
      <CitizenFormModal isOpen={isOpen} setOpen={setIsOpen} citizen={citizen}/>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-primary">{safeString(citizen.fullName)}</h2>
            <div className="text-text-muted text-sm">ID: {safeString(citizen.id)}</div>
          </div>
          <button
            className="px-3 py-1 border rounded bg-primary text-white hover:bg-secondary"
            onClick={() => {setIsOpen(true)}}
          >
            Редактировать
          </button>
        </div>

        <Section title="Основные сведения">
          <Info label="Дата рождения" value={formatDate(citizen.birthDate)} />
          <Info label="Пол" value={safeString(citizen.gender)} />
          <Info label="Семейное положение" value={safeString(citizen.maritalStatus)} />
          <Info label="Адрес" value={safeString(citizen.address)} />
          <Info label="Телефон" value={safeString(citizen.phone)} />
          <Info label="Email" value={safeString(citizen.email)} />
        </Section>

        <CollapsibleSection title="Работа и доход" data={safeArray(citizen.jobs)}>
          {safeArray(citizen.jobs).length === 0 ? (
            <p className="text-text-muted">Нет данных</p>
          ) : (
            <Table
              headers={["Компания", "Должность", "Период", "Зарплата"]}
              rows={citizen.jobs.map((job) => [
                safeString(job.company),
                safeString(job.position),
                `${formatDate(job.startDate)} → ${job.endDate ? formatDate(job.endDate) : "по наст. время"}`,
                <span className="text-success">{safeNumber(job.salary)} ₽</span>,
              ])}
            />
          )}
        </CollapsibleSection>

        <CollapsibleSection title="Образование" data={safeArray(citizen.education)}>
          {safeArray(citizen.education).length === 0 ? (
            <p className="text-text-muted">Нет данных</p>
          ) : (
            <Table
              headers={["Учреждение", "Степень", "Год"]}
              rows={citizen.education.map((e) => [
                safeString(e.institution),
                safeString(e.degree),
                safeString(e.year),
              ])}
            />
          )}
        </CollapsibleSection>

        <CollapsibleSection title="Члены семьи" data={safeArray(citizen.family)}>
          {safeArray(citizen.family).length === 0 ? (
            <p className="text-text-muted">Нет данных</p>
          ) : (
            <Table
              headers={["ФИО", "Родство", "Дата рождения"]}
              rows={citizen.family.map((f) => [
                safeString(f.fullName),
                safeString(f.relation),
                formatDate(f.birthDate),
              ])}
            />
          )}
        </CollapsibleSection>

        <Section title="Документы">
          <Info label="Паспорт" value={safeString(documents.passport)} />
          <Info label="ИНН" value={safeString(documents.inn)} />
          <Info label="СНИЛС" value={safeString(documents.snils)} />
          <Info label="Вод. удостоверение" value={safeString(documents.driverLicense)} />
        </Section>

        <Section title="Здоровье">
          <Info label="Группа крови" value={safeString(health.bloodType)} />
          <Info label="Аллергии" value={safeArray(health.allergies).join(", ") || "Нет данных"} />
          <Info
            label="Хронические болезни"
            value={safeArray(health.chronicDiseases).join(", ") || "Нет данных"}
          />
        </Section>

        <CollapsibleSection title="Хобби" data={safeArray(citizen.hobbies)}>
          {safeArray(citizen.hobbies).length === 0 ? (
            <p className="text-text-muted">Нет данных</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {citizen.hobbies.map((hobby, i) => (
                <span key={i} className="px-2 py-1 rounded-full text-sm bg-accent text-primary">
                  {hobby}
                </span>
              ))}
            </div>
          )}
        </CollapsibleSection>

        <CollapsibleSection title="Штрафы" data={safeArray(citizen.fines)}>
          {safeArray(citizen.fines).length === 0 ? (
            <p className="text-text-muted">Нет штрафов</p>
          ) : (
            <Table
              headers={["Тип", "Сумма", "Дата"]}
              rows={citizen.fines.map((fine) => [
                safeString(fine.type),
                <span className="text-error font-medium">{safeNumber(fine.amount)} ₽</span>,
                formatDate(fine.date),
              ])}
            />
          )}
        </CollapsibleSection>
      </div>
    </>
  );
};

const Section = ({ title, children }) => (
  <section className="space-y-3">
    <h3 className="font-semibold text-lg border-b border-default pb-1">{title}</h3>
    <div className="space-y-2">{children}</div>
  </section>
);

const CollapsibleSection = ({ title, children, data }) => {
  const [open, setOpen] = useState(true);

  return (
    <section className="space-y-2">
      <h3
        className="font-semibold text-lg border-b border-default pb-1 cursor-pointer flex justify-between items-center"
        onClick={() => setOpen(!open)}
      >
        {title} {data?.length > 0 && <span>{open ? "▲" : "▼"}</span>}
      </h3>
      {open && <div className="space-y-2">{children}</div>}
    </section>
  );
};

const Info = ({ label, value }) => (
  <p>
    <span className="text-text-muted">{label}: </span>
    <span className="font-medium">{value || "Нет данных"}</span>
  </p>
);

const Table = ({ headers, rows }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full border border-default text-sm">
      <thead className="bg-surface">
        <tr>
          {headers.map((h, i) => (
            <th key={i} className="px-3 py-2 text-left font-semibold border-b border-default">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="odd:bg-background even:bg-surface">
            {row.map((cell, j) => (
              <td key={j} className="px-3 py-2 border-b border-default">
                {cell || "Нет данных"}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
