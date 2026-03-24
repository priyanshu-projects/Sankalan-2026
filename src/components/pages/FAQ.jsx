export default function FAQ() {

const faqs = [
{
q:"When is Sankalan 2025 scheduled?",
a:"Sankalan 2025 will be organized at the Department of Computer Science, University of Delhi in April. The fest spans multiple events across technical and non-technical categories."
},

{
q:"Who can participate in Sankalan?",
a:"Students from colleges and universities across the country can participate. Some events may allow team participation while others are individual competitions."
},

{
q:"How do I register for events?",
a:"Participants can register through the official Sankalan website. Each event may have a separate registration form or registration link."
},

{
q:"Is there a registration fee?",
a:"Some events may have a nominal registration fee while others may be free to participate in. Details are mentioned on the individual event pages."
},

{
q:"What kind of events are conducted at Sankalan?",
a:"Sankalan hosts a mix of technical and creative competitions such as competitive coding, hackathons, debugging contests, quizzes, workshops, and fun non-tech events."
},

{
q:"Can participants join multiple events?",
a:"Yes. Participants are generally allowed to register for multiple events as long as the event timings do not clash."
},

{
q:"Where will the events take place?",
a:"All events are conducted at the Department of Computer Science, University of Delhi campus unless mentioned otherwise."
},

{
q:"How will winners be decided?",
a:"Winners are selected based on event-specific judging criteria such as performance, innovation, correctness of solutions, and overall presentation."
},

{
q:"Will certificates be provided?",
a:"Yes. Certificates are provided to winners and participants depending on the event guidelines."
}
]

return(

<section className="min-h-screen bg-black text-white py-32 px-6">

<div className="max-w-5xl mx-auto">

<h1 className="text-5xl font-bold text-center tracking-widest text-cyan-400 mb-20 drop-shadow-[0_0_25px_#00ffff]">
FREQUENTLY ASKED QUESTIONS
</h1>

<div className="space-y-8">

{faqs.map((faq,i)=>(
<div
key={i}
className="p-6 rounded-xl border border-cyan-400/20 bg-[#050b14] hover:border-cyan-400/60 transition"
>

<h3 className="text-lg font-semibold text-cyan-400 mb-3">
{faq.q}
</h3>

<p className="text-gray-400 text-sm leading-relaxed">
{faq.a}
</p>

</div>
))}

</div>

</div>

</section>

)

}