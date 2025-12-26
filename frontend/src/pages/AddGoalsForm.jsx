// import { useNavigate } from "react-router-dom";
// import { DashboardLayout } from "@/components/layout/DashboardLayout";
// import { Button } from "@/components/ui/button";

// export default function AddGoal() {
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // ONLY navigation (no data logic)
//     navigate("/goals");
//   };

//   return (
//     <DashboardLayout
//       title="Add Goal"
//       subtitle="Create a new financial goal"
//     >
//       <div className="max-w-2xl mx-auto">
//         <div className="bg-card border border-border rounded-2xl p-8">
//           {/* Header */}
//           <div className="mb-8">
//             <h2 className="text-2xl font-bold text-foreground mb-1">
//               New Goal Details
//             </h2>
//             <p className="text-sm text-muted-foreground">
//               Define your target, priority, and timeline
//             </p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Goal Title */}
//             <div>
//               <label className="block text-sm font-medium text-foreground mb-2">
//                 Goal Title
//               </label>
//               <input
//                 type="text"
//                 placeholder="e.g. Emergency Fund"
//                 className="input-field"
//                 required
//               />
//             </div>

//             {/* Amounts */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">
//                   Target Amount (₹)
//                 </label>
//                 <input
//                   type="number"
//                   placeholder="300000"
//                   className="input-field"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">
//                   Already Saved (₹)
//                 </label>
//                 <input
//                   type="number"
//                   placeholder="50000"
//                   className="input-field"
//                 />
//               </div>
//             </div>

//             {/* Deadline */}
//             <div>
//               <label className="block text-sm font-medium text-foreground mb-2">
//                 Target Date
//               </label>
//               <input type="date" className="input-field" required />
//             </div>

//             {/* Priority & Duration */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">
//                   Priority
//                 </label>
//                 <select className="input-field">
//                   <option value="high">High Priority</option>
//                   <option value="medium">Medium Priority</option>
//                   <option value="low">Low Priority</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">
//                   Goal Duration
//                 </label>
//                 <select className="input-field">
//                   <option value="short">Short Term</option>
//                   <option value="long">Long Term</option>
//                 </select>
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="flex justify-end gap-3 pt-6 border-t border-border">
//               <Button
//                 type="button"
//                 variant="secondary"
//                 onClick={() => navigate("/goals")}
//               >
//                 Cancel
//               </Button>

//               <Button
//                 type="submit"
//                 className="bg-gradient-to-r from-primary to-accent text-white"
//               >
//                 Save Goal
//               </Button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }

import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { addGoalApi } from "../config/goal.api";
export default function AddGoal() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    targetAmount: "",
    currentAmount: "",
    deadline: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addGoalApi({
        title: form.title,
        targetAmount: Number(form.targetAmount),
        currentAmount: Number(form.currentAmount || 0),
        deadline: form.deadline,
      });

      navigate("/goals"); // ✅ success redirect
    } catch (err) {
      console.error(err);
      alert("Failed to add goal");
    }
  };

  return (
    <DashboardLayout title="Add Goal" subtitle="Create a new financial goal">
      <div className="max-w-2xl mx-auto">
        <div className="bg-card border border-border rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block text-sm font-medium mb-2">
                Goal Title
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                name="targetAmount"
                type="number"
                placeholder="Target Amount"
                className="input-field"
                onChange={handleChange}
                required
              />
              <input
                name="currentAmount"
                type="number"
                placeholder="Already Saved"
                className="input-field"
                onChange={handleChange}
              />
            </div>

            <input
              name="deadline"
              type="date"
              className="input-field"
              onChange={handleChange}
            />

            <div className="flex justify-end gap-3 pt-6 border-t">
              <Button type="button" variant="secondary" onClick={() => navigate("/goals")}>
                Cancel
              </Button>
              <Button type="submit">Save Goal</Button>
            </div>

          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
