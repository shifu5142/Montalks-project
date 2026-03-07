import { User } from "lucide-react"

type Comment = {
  name: string
  role: string
  text: string
}

const comments: Comment[] = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    text: "Montalks helped me turn scattered ideas into a clear, actionable plan in minutes.",
  },
  {
    name: "David Kim",
    role: "Startup Founder",
    text: "I use this every day to organize my thoughts before important meetings. It's a game changer.",
  },
  {
    name: "Emily Carter",
    role: "Software Engineer",
    text: "The AI plans are so structured and easy to follow. It keeps me focused on what matters.",
  },
  {
    name: "Michael Lee",
    role: "Freelancer",
    text: "Planning my monthly budget is finally simple. I can see exactly where my money is going.",
  },
]

export default function Comments() {
  return (
    <section className="flex h-screen w-full flex-col items-center justify-start bg-secondary/40 px-4 pt-20 pb-10 md:px-8">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <h2 className=" text-balance text-center  text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          What people are saying
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 " >
          {comments.map((comment) => (
            <div
              key={comment.name}
              className="flex flex-col gap-4 rounded-xl border border-border/60 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground">
                    {comment.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {comment.role}
                  </span>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                &ldquo;{comment.text}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

