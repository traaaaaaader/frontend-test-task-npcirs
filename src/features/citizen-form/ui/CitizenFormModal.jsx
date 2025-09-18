import { useState, useEffect } from "react";
import { z } from "zod";

const familyMemberSchema = z.object({
  fullName: z.string().min(1),
  relation: z.string().min(1),
  birthDate: z.string().min(1),
});

const educationSchema = z.object({
  institution: z.string().min(1),
  degree: z.enum(["Среднее", "Среднее специальное", "Высшее", "Кандидат наук", "Доктор наук"]),
  year: z.number().min(1900).max(new Date().getFullYear()),
});

const jobSchema = z.object({
  company: z.string().min(1),
  position: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().optional(),
  salary: z.number().min(0),
});

const fineSchema = z.object({
  type: z.enum(["ПДД", "Налоговая", "Административная"]),
  amount: z.number().min(0),
  date: z.string().min(1),
});

const citizenSchema = z.object({
  fullName: z.string().min(1),
  gender: z.enum(["Мужской", "Женский"]),
  birthDate: z.string().min(1),
  address: z.string().min(1),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  maritalStatus: z.enum(["Холост/не замужем", "Женат/замужем", "Разведен", "Вдовец/вдова"]),
  hobbies: z.string().optional(),
  job: z.string().optional(),
  income: z.number().optional(),
  educationLevel: z.enum(["Среднее", "Среднее специальное", "Высшее", "Кандидат наук", "Доктор наук"]),
  family: z.array(familyMemberSchema),
  education: z.array(educationSchema),
  jobs: z.array(jobSchema),
  documents: z.object({
    passport: z.string(),
    inn: z.string(),
    snils: z.string(),
    driverLicense: z.string(),
  }),
  health: z.object({
    bloodType: z.enum(["A", "B", "AB", "O"]),
    allergies: z.array(z.string()).optional(),
    chronicDiseases: z.array(z.string()).optional(),
  }),
  fines: z.array(fineSchema),
});

export const CitizenFormModal = ({ isOpen, setOpen, citizen }) => {
  const steps = [
    "Личные данные и контакты",
    "Работа и образование",
    "Семья",
    "Документы и здоровье",
    "Работы прошлые и штрафы",
  ];

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen && citizen) {
      setStep(0);
      setFormData({
        ...citizen,
        hobbies: (citizen.hobbies || []).join(", "),
        family: citizen.family || [],
        education: citizen.education || [],
        jobs: citizen.jobs || [],
        fines: citizen.fines || [],
        documents: citizen.documents || {},
        health: citizen.health || { bloodType: "", allergies: [], chronicDiseases: [] },
      });
      setErrors({});
    }
  }, [isOpen, citizen]);

  if (!isOpen || !formData) return null;

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleArrayChange = (arrayName, index, field, value) => {
    const newArray = [...formData[arrayName]];
    newArray[index][field] = value;
    setFormData({ ...formData, [arrayName]: newArray });
  };

  const handleAddArrayItem = (arrayName, newItem) => {
    setFormData({ ...formData, [arrayName]: [...formData[arrayName], newItem] });
  };

  const handleRemoveArrayItem = (arrayName, index) => {
    const newArray = [...formData[arrayName]];
    newArray.splice(index, 1);
    setFormData({ ...formData, [arrayName]: newArray });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const parsed = citizenSchema.parse({
        ...formData,
        hobbies: formData.hobbies.split(",").map((h) => h.trim()),
      });
      console.log("Validated data:", parsed);
      setOpen(false);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const formatted = {};
        err.errors.forEach((e) => {
          formatted[e.path.join(".")] = e.message;
        });
        setErrors(formatted);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative bg-surface text-text rounded-2xl shadow-xl w-full max-w-5xl p-6 border border-default transition-all duration-300 overflow-auto max-h-[90vh]">
        <button
          onClick={() => setOpen(false)}
          className="absolute cursor-pointer top-3 right-3 text-text-muted hover:text-text transition"
        >
          ✕
        </button>

        <div className="flex justify-between mb-6">
          {steps.map((s, index) => (
            <div key={index} className="flex-1 flex flex-col items-center relative">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                  index <= step ? "bg-primary border-primary text-white" : "bg-background border-gray-300 text-gray-400"
                }`}
              >
                {index + 1}
              </div>
              <span className="text-xs mt-1 text-center">{s}</span>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-4 text-primary">{steps[step]}</h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          {step === 0 && (
            <>
              <input
								type="text"
								placeholder="ФИО"
								value={formData.fullName}
								onChange={(e)=>handleChange("fullName", e.target.value)} className="col-span-2 border rounded-lg px-3 py-2" />
              <select
								value={formData.gender}
								onChange={(e)=>handleChange("gender", e.target.value)}
								className="border rounded-lg px-3 py-2">
                <option disabled>Выберите пол</option>
                {["Мужской","Женский"].map(g=> <option key={g} value={g}>{g}</option>)}
              </select>
              <input
								type="date"
								value={formData.birthDate}
								onChange={(e)=>handleChange("birthDate", e.target.value)} className="border rounded-lg px-3 py-2" />
              <input
								type="text"
								placeholder="Адрес"
								value={formData.address}
								onChange={(e)=>handleChange("address", e.target.value)} className="col-span-2 border rounded-lg px-3 py-2" />
              <input
								type="tel"
								placeholder="Телефон"
								value={formData.phone}
								onChange={(e)=>handleChange("phone", e.target.value)}
								className="border rounded-lg px-3 py-2" />
              <input 
								type="email"
								placeholder="Email"
								value={formData.email}
								onChange={(e)=>handleChange("email", e.target.value)}
								className="border rounded-lg px-3 py-2" />
              <select value={formData.maritalStatus} onChange={(e)=>handleChange("maritalStatus", e.target.value)} className="border rounded-lg px-3 py-2">
                <option disabled>Выберите семейное положение</option>
                {["Холост/не замужем","Женат/замужем","Разведен","Вдовец/вдова"].map(s=> <option key={s} value={s}>{s}</option>)}
              </select>
              <input
								type="text"
								placeholder="Хобби (через запятую)"
								value={formData.hobbies}
								onChange={(e)=>handleChange("hobbies", e.target.value)} className="col-span-2 border rounded-lg px-3 py-2" />
            </>
          )}

          {step === 1 && (
            <>
              <input
								type="text"
								placeholder="Текущая работа"
								value={formData.job}
								onChange={(e)=>handleChange("job", e.target.value)}
								className="border rounded-lg px-3 py-2" />
              <input
								type="number"
								placeholder="Доход"
								value={formData.income}
								onChange={(e)=>handleChange("income", e.target.value)}
								className="border rounded-lg px-3 py-2" />
              <select
								value={formData.educationLevel}
								onChange={(e)=>handleChange("educationLevel", e.target.value)} className="col-span-2 border rounded-lg px-3 py-2">
                <option disabled>Выберите уровень образования</option>
                {["Среднее","Среднее специальное","Высшее","Кандидат наук","Доктор наук"].map(lvl=><option key={lvl} value={lvl}>{lvl}</option>)}
              </select>
              {formData.education.map((edu, idx)=>(
                <div key={idx} className="col-span-2 border rounded-lg p-2 space-y-1">
                  <input
										type="text"
										placeholder="Учебное заведение"
										value={edu.institution}
										onChange={(e)=>handleArrayChange("education", idx, "institution", e.target.value)}
										className="border rounded-lg px-2 py-1 w-full" />
                  <select
										value={edu.degree}
										onChange={(e)=>handleArrayChange("education", idx, "degree", e.target.value)}
										className="border rounded-lg px-2 py-1 w-full">
                    {["Среднее","Среднее специальное","Высшее","Кандидат наук","Доктор наук"].map(lvl=> <option key={lvl} value={lvl}>{lvl}</option>)}
                  </select>
                  <input
										type="number"
										placeholder="Год"
										value={edu.year}
										onChange={(e)=>handleArrayChange("education", idx, "year", e.target.valueAsNumber)}
										className="border rounded-lg px-2 py-1 w-full" />
                  <button
										type="button"
										onClick={()=>handleRemoveArrayItem("education", idx)} className="text-error text-sm"
									>Удалить</button>
                </div>
              ))}
              <button
								type="button"
								onClick={()=>handleAddArrayItem("education",{institution:"",degree:"Среднее",year:2000})}
								className="col-span-2 bg-primary text-white rounded-lg px-3 py-1"
							>Добавить образование</button>
            </>
          )}

          {step === 2 && (
            <>
              {formData.family.map((member, idx)=>(
                <div key={idx} className="col-span-2 border rounded-lg p-2 space-y-1">
                  <input 
										type="text"
										placeholder="ФИО"
										value={member.fullName}
										onChange={(e)=>handleArrayChange("family", idx, "fullName", e.target.value)} 
										className="border rounded-lg px-2 py-1 w-full" />
                  <input 
										type="text"
										placeholder="Родство"
										value={member.relation}
										onChange={(e)=>handleArrayChange("family", idx, "relation", e.target.value)}
										className="border rounded-lg px-2 py-1 w-full" />
                  <input
										type="date"
										value={member.birthDate}
										onChange={(e)=>handleArrayChange("family", idx, "birthDate", e.target.value)}
										className="border rounded-lg px-2 py-1 w-full" />
                  <button
										type="button"
										onClick={()=>handleRemoveArrayItem("family", idx)} className="text-error text-sm"
									>Удалить</button>
                </div>
              ))}
              <button type="button" onClick={()=>handleAddArrayItem("family",{fullName:"",relation:"",birthDate:""})} className="col-span-2 bg-primary text-white rounded-lg px-3 py-1">Добавить члена семьи</button>
            </>
          )}

          {step === 3 && (
            <>
              <input
								type="text"
								placeholder="Паспорт"
								value={formData.documents.passport}
								onChange={(e)=>setFormData({...formData,documents:{...formData.documents,passport:e.target.value}})}
								className="border rounded-lg px-3 py-2" />
              <input
								type="text"
								placeholder="ИНН"
								value={formData.documents.inn}
								onChange={(e)=>setFormData({...formData,documents:{...formData.documents,inn:e.target.value}})}
								className="border rounded-lg px-3 py-2" />
              <input
								type="text"
								placeholder="СНИЛС"
								value={formData.documents.snils}
								onChange={(e)=>setFormData({...formData,documents:{...formData.documents,snils:e.target.value}})}
								className="border rounded-lg px-3 py-2" />
              <input
								type="text"
								placeholder="Водительское удостоверение"
								value={formData.documents.driverLicense}
								onChange={(e)=>setFormData({...formData,documents:{...formData.documents,driverLicense:e.target.value}})}
								className="col-span-2 border rounded-lg px-3 py-2" />
              <select
								value={formData.health.bloodType}
								onChange={(e)=>setFormData({...formData,health:{...formData.health,bloodType:e.target.value}})}
								className="border rounded-lg px-3 py-2">
                <option disabled>Группа крови</option>
                {["A","B","AB","O"].map(bt=><option key={bt} value={bt}>{bt}</option>)}
              </select>
              <input
								type="text"
								placeholder="Аллергии (через запятую)"
								value={(formData.health.allergies||[]).join(",")}
								onChange={(e)=>setFormData({...formData,health:{...formData.health,allergies:e.target.value.split(",")}})}
								className="border rounded-lg px-3 py-2" />
              <input
								type="text"
								placeholder="Хронические болезни (через запятую)"
								value={(formData.health.chronicDiseases||[]).join(",")}
								onChange={(e)=>setFormData({...formData,health:{...formData.health,chronicDiseases:e.target.value.split(",")}})}
								className="border rounded-lg px-3 py-2" />
            </>
          )}

          {step === 4 && (
            <>
              {formData.jobs.map((job, idx)=>(
                <div key={idx} className="col-span-2 border rounded-lg p-2 space-y-1">
                  <input
										type="text"
										placeholder="Компания"
										value={job.company}
										onChange={(e)=>handleArrayChange("jobs", idx, "company", e.target.value)}
										className="border rounded-lg px-2 py-1 w-full" />
                  <input
										type="text"
										placeholder="Должность"
										value={job.position}
										onChange={(e)=>handleArrayChange("jobs", idx, "position", e.target.value)}
										className="border rounded-lg px-2 py-1 w-full" />
                  <input
										type="date"p
										laceholder="Дата начала"
										value={job.startDate}
										onChange={(e)=>handleArrayChange("jobs", idx, "startDate", e.target.value)}
										className="border rounded-lg px-2 py-1 w-full" />
                  <input
										type="date"
										placeholder="Дата окончания"
										value={job.endDate}
										onChange={(e)=>handleArrayChange("jobs", idx, "endDate", e.target.value)}
										className="border rounded-lg px-2 py-1 w-full" />
                  <input
										type="number"
										placeholder="Зарплата"
										value={job.salary}
										onChange={(e)=>handleArrayChange("jobs", idx, "salary", e.target.valueAsNumber)}
										className="border rounded-lg px-2 py-1 w-full" />
                  <button type="button" onClick={()=>handleRemoveArrayItem("jobs", idx)} className="text-error text-sm">Удалить</button>
                </div>
              ))}
              <button
								type="button"
								onClick={()=>handleAddArrayItem("jobs",{company:"",position:"",startDate:"",salary:0})}
								className="col-span-2 bg-primary text-white rounded-lg px-3 py-1">Добавить работу</button>

              {formData.fines.map((fine, idx)=>(
                <div key={idx} className="col-span-2 border rounded-lg p-2 space-y-1">
                  <select
										value={fine.type}
										onChange={(e)=>handleArrayChange("fines", idx, "type", e.target.value)}
										className="border rounded-lg px-2 py-1 w-full">
                    {["ПДД","Налоговая","Административная"].map(t=><option key={t} value={t}>{t}</option>)}
                  </select>
                  <input
										type="number"
										placeholder="Сумма"
										value={fine.amount}
										onChange={(e)=>handleArrayChange("fines", idx, "amount", e.target.valueAsNumber)}
										className="border rounded-lg px-2 py-1 w-full" />
                  <input
										type="date"
										value={fine.date}
										onChange={(e)=>handleArrayChange("fines", idx, "date", e.target.value)}
										className="border rounded-lg px-2 py-1 w-full" />
                  <button type="button" onClick={()=>handleRemoveArrayItem("fines", idx)} className="text-error text-sm">Удалить</button>
                </div>
              ))}
              <button
								type="button"
								onClick={()=>handleAddArrayItem("fines",{type:"ПДД",amount:0,date:""})} className="col-span-2 bg-primary text-white rounded-lg px-3 py-1">Добавить штраф</button>
            </>
          )}

          <div className="col-span-2 flex justify-between mt-4">
            {step>0 && 
							<button type="button" onClick={prevStep} className="bg-gray-300 text-gray-700 rounded-lg px-4 py-2 hover:bg-gray-400 transition">Назад</button>
						}
            {step<steps.length-1 && 
							<button type="button" onClick={nextStep} className="ml-auto bg-primary text-white rounded-lg px-4 py-2 hover:bg-secondary transition">Далее</button>
						}
            {step===steps.length-1 && 
							<button type="submit" className="ml-auto bg-primary text-white rounded-lg px-6 py-2 hover:bg-secondary transition">Сохранить</button>
						}
          </div>
        </form>
      </div>
    </div>
  );
};
