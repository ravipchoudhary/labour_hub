import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import TopBar from "../components/Topbar"

type Labour = {
  labourId: string
  name: string
  document: string
  ignoredJobs: number
}

const LabourVerification = () => {

  const navigate = useNavigate()

  const [data,setData] = useState<Labour[]>([])
  const [reminderMsg,setReminderMsg] = useState("")
  const [warningMsg,setWarningMsg] = useState("")
  const [blockMsg,setBlockMsg] = useState("")
  const [remaining,setRemaining] = useState(0)

  useEffect(()=>{
    fetchLabours()
    fetchCooldown()
  },[])

  useEffect(()=>{
    const interval = setInterval(()=>{
      setRemaining(prev => prev>1000 ? prev-1000 : 0)
    },1000)

    return ()=>clearInterval(interval)
  },[])

  const fetchCooldown = async()=>{

    const token = localStorage.getItem("token")

    const res = await fetch("http://localhost:4000/admin/reminder-cooldown",{
      headers:{ Authorization:`Bearer ${token}` }
    })

    const result = await res.json()

    setRemaining(result.remaining || 0)
  }

  const formatTime = (ms:number)=>{

    const h = Math.floor(ms/3600000)
    const m = Math.floor((ms%3600000)/60000)
    const s = Math.floor((ms%60000)/1000)

    return `${h}h ${m}m ${s}s`
  }

  const fetchLabours = async()=>{

    const token = localStorage.getItem("token")

    const res = await fetch("http://localhost:4000/admin/labour-verification",{
      headers:{ Authorization:`Bearer ${token}` }
    })

    const result = await res.json()

    if(result.success){
      setData(result.data)
    }
  }

  const sendReminderBulk = async()=>{

    const token = localStorage.getItem("token")

    const res = await fetch("http://localhost:4000/admin/send-reminder-bulk",{
      method:"POST",
      headers:{ Authorization:`Bearer ${token}` }
    })

    const result = await res.json()

    if(result.success){
      setReminderMsg("Reminder sent successfully")
    }else{
      setReminderMsg(result.message)
    }

    fetchCooldown()

    setTimeout(()=>setReminderMsg(""),3000)
  }

  const sendWarningBulk = async () => {

  const token = localStorage.getItem("token")

  const res = await fetch("http://localhost:4000/admin/send-warning-bulk", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` }
  })

  const result = await res.json()

  if (result.sent > 0) {
    setWarningMsg("Warning sent successfully")
  } else {
    setWarningMsg("No applicable labour for warning")
  }

  setTimeout(() => {
    setWarningMsg("")
  }, 3000)

}

  const blockAllInactive = async () => {

  const token = localStorage.getItem("token")

  const res = await fetch("http://localhost:4000/admin/block-all-inactive", {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` }
  })

  const result = await res.json()

  if (result.blocked > 0) {
    setBlockMsg("Inactive users blocked")
  } else {
    setBlockMsg("No inactive labour to block")
  }

  setTimeout(() => {
    setBlockMsg("")
  }, 3000)

  fetchLabours()
}

  const missed = data.filter(l=>l.ignoredJobs===1).length
  const reminder = data.filter(l=>l.ignoredJobs===2).length
  const warning = data.filter(l=>l.ignoredJobs===3).length
  const inactive = data.filter(l=>l.ignoredJobs>=4).length

  const badgeColor = (count:number)=>{
    if(count===1) return "bg-blue-500"
    if(count===2) return "bg-yellow-500"
    if(count===3) return "bg-orange-500"
    return "bg-red-600"
  }

  const badgeText = (count:number)=>{
    if(count===1) return "Missed Job"
    if(count===2) return "Reminder"
    if(count===3) return "Warning"
    return "Inactive"
  }

  return(

    <div className="min-h-screen bg-gray-100">

      <TopBar/>

      <div className="max-w-[1300px] mx-auto px-6 py-8">

        <h1 className="text-2xl font-semibold mb-6">
          Labour Verification
        </h1>

        <div className="grid grid-cols-4 gap-5 mb-8">

          <div className="bg-white border rounded-xl shadow p-5">
            <p className="text-sm text-gray-500">Missed</p>
            <h2 className="text-3xl font-bold text-blue-600">{missed}</h2>
          </div>

          <div className="bg-white border rounded-xl shadow p-5 flex flex-col">

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Reminder</p>
                <h2 className="text-3xl font-bold text-yellow-600">{reminder}</h2>
              </div>

              <button
                disabled={remaining>0}
                onClick={sendReminderBulk}
                className="bg-yellow-500 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-yellow-600 text-white px-4 py-4 rounded-lg text-sm"
              >
                Send Reminder
              </button>
            </div>

            {remaining>0 &&
              <p className="text-xs text-red-500 mt-2">
                Next reminder available in {formatTime(remaining)}
              </p>
            }

            {reminderMsg &&
              <p className="text-xs text-green-700 bg-green-100 px-3 py-1 rounded mt-2 w-fit">
                {reminderMsg}
              </p>
            }

          </div>

          <div className="bg-white border rounded-xl shadow p-5 flex flex-col">

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Warning</p>
                <h2 className="text-3xl font-bold text-orange-600">{warning}</h2>
              </div>

              <button
                onClick={sendWarningBulk}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-4 rounded-lg text-sm"
              >
                Send Warning
              </button>
            </div>

            {warningMsg &&
              <p className="text-xs text-green-700 bg-green-100 px-3 py-1 rounded mt-2 w-fit">
                {warningMsg}
              </p>
            }

          </div>

          <div className="bg-white border rounded-xl shadow p-5 flex flex-col">

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Block</p>
                <h2 className="text-3xl font-bold text-red-600">{inactive}</h2>
              </div>

              <button
                onClick={blockAllInactive}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-lg text-sm"
              >
                Block All
              </button>
            </div>

            {blockMsg &&
              <p className="text-xs text-green-700 bg-green-100 px-3 py-1 rounded mt-2 w-fit">
                {blockMsg}
              </p>
            }

          </div>

        </div>

        <div className="grid grid-cols-3 gap-4">

          {data.map(l=>(
            <div
              key={l.labourId}
              onClick={()=>navigate(`/admin/users/${l.labourId}`)}
              className="bg-white border rounded-xl shadow hover:shadow-md transition cursor-pointer p-4"
            >

              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-gray-800 text-sm">
                  {l.name}
                </h2>

                <span className={`text-white text-[10px] px-2 py-0.5 rounded-full ${badgeColor(l.ignoredJobs)}`}>
                  {badgeText(l.ignoredJobs)}
                </span>
              </div>

              <p className="text-xs text-gray-400">
                Ignored Jobs
              </p>

              <h3 className="text-xl font-bold text-gray-800">
                {l.ignoredJobs}
              </h3>

              <div className="mt-2">
                <a
                  href={l.document}
                  target="_blank"
                  onClick={(e)=>e.stopPropagation()}
                  className="text-xs text-indigo-600 hover:underline"
                >
                  View Document
                </a>
              </div>

            </div>
          ))}

        </div>

      </div>

    </div>

  )
}

export default LabourVerification