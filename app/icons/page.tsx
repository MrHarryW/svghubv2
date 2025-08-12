"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { Header } from "@/components/header"
import { Search, Download, Heart, Copy, Check } from "lucide-react"

const sampleIcons = [
  // Interface Icons
  {
    id: 1,
    name: "Home",
    category: "Interface",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>`,
    tags: ["home", "house", "building"],
  },
  {
    id: 2,
    name: "Menu",
    category: "Interface",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>`,
    tags: ["menu", "hamburger", "navigation", "bars"],
  },
  {
    id: 3,
    name: "Close",
    category: "Interface",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>`,
    tags: ["close", "x", "cancel", "exit"],
  },
  {
    id: 4,
    name: "Search",
    category: "Interface",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/><path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>`,
    tags: ["search", "find", "magnify", "look"],
  },
  {
    id: 5,
    name: "Plus",
    category: "Interface",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>`,
    tags: ["plus", "add", "create", "new"],
  },
  {
    id: 6,
    name: "Minus",
    category: "Interface",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>`,
    tags: ["minus", "remove", "delete", "subtract"],
  },
  {
    id: 7,
    name: "Check",
    category: "Interface",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>`,
    tags: ["check", "done", "complete", "success"],
  },
  {
    id: 8,
    name: "Arrow Up",
    category: "Interface",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="19" x2="12" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><polyline points="5,12 12,5 19,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>`,
    tags: ["arrow", "up", "direction", "navigation"],
  },
  {
    id: 9,
    name: "Arrow Down",
    category: "Interface",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><polyline points="19,12 12,19 5,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>`,
    tags: ["arrow", "down", "direction", "navigation"],
  },
  {
    id: 10,
    name: "Arrow Left",
    category: "Interface",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="19" y1="12" x2="5" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><polyline points="12,19 5,12 12,5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>`,
    tags: ["arrow", "left", "direction", "navigation"],
  },
  {
    id: 11,
    name: "Arrow Right",
    category: "Interface",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><polyline points="12,5 19,12 12,19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>`,
    tags: ["arrow", "right", "direction", "navigation"],
  },
  {
    id: 12,
    name: "Settings",
    category: "Interface",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/><path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.2573 9.77251 19.9887C9.5799 19.7201 9.31074 19.5176 9 19.41C8.69838 19.2769 8.36381 19.2372 8.03941 19.296C7.71502 19.3548 7.41568 19.5095 7.18 19.74L7.12 19.8C6.93425 19.986 6.71368 20.1335 6.47088 20.2341C6.22808 20.3348 5.96783 20.3866 5.705 20.3866C5.44217 20.3866 5.18192 20.3348 4.93912 20.2341C4.69632 20.1335 4.47575 19.986 4.29 19.8C4.10405 19.6143 3.95653 19.3937 3.85588 19.1509C3.75523 18.9081 3.70343 18.6478 3.70343 18.385C3.70343 18.1222 3.75523 17.8619 3.85588 17.6191C3.95653 17.3763 4.10405 17.1557 4.29 16.97L4.35 16.91C4.58054 16.6743 4.73519 16.375 4.794 16.0506C4.85282 15.7262 4.81312 15.3916 4.68 15.09C4.55324 14.7942 4.34276 14.542 4.07447 14.3643C3.80618 14.1866 3.49179 14.0913 3.17 14.09H3C2.46957 14.09 1.96086 13.8793 1.58579 13.5042C1.21071 13.1291 1 12.6204 1 12.09C1 11.5596 1.21071 11.0509 1.58579 10.6758C1.96086 10.3007 2.46957 10.09 3 10.09H3.09C3.42099 10.0823 3.742 9.97512 4.01062 9.78251C4.27925 9.5899 4.48167 9.32074 4.59 9.01C4.72312 8.70838 4.76282 8.37381 4.704 8.04941C4.64519 7.72502 4.49054 7.42568 4.26 7.19L4.2 7.13C4.01405 6.94425 3.86653 6.72368 3.76588 6.48088C3.66523 6.23808 3.61343 5.97783 3.61343 5.715C3.61343 5.45217 3.66523 5.19192 3.76588 4.94912C3.86653 4.70632 4.01405 4.48575 4.2 4.3C4.38575 4.11405 4.60632 3.96653 4.84912 3.86588C5.09192 3.76523 5.35217 3.71343 5.615 3.71343C5.87783 3.71343 6.13808 3.76523 6.38088 3.86588C6.62368 3.96653 6.84425 4.11405 7.03 4.3L7.09 4.36C7.32568 4.59054 7.62502 4.74519 7.94941 4.804C8.27381 4.86282 8.60838 4.82312 8.91 4.69H9C9.29577 4.56324 9.54802 4.35276 9.72569 4.08447C9.90337 3.81618 9.99872 3.50179 10 3.18V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>`,
    tags: ["settings", "gear", "config", "preferences"],
  },

  // Communication Icons
  {
    id: 13,
    name: "Mail",
    category: "Communication",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>`,
    tags: ["mail", "email", "message", "contact"],
  },
  {
    id: 14,
    name: "Phone",
    category: "Communication",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 16.92V19C22 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>`,
    tags: ["phone", "call", "telephone", "contact"],
  },
  {
    id: 15,
    name: "Message Circle",
    category: "Communication",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.60573 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>`,
    tags: ["message", "chat", "bubble", "conversation"],
  },
  {
    id: 16,
    name: "Video",
    category: "Communication",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="23,7 16,12 23,17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>`,
    tags: ["video", "camera", "call", "meeting"],
  },

  // Social Icons
  {
    id: 17,
    name: "Heart",
    category: "Social",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39467C21.7563 5.72723 21.351 5.1208 20.84 4.61V4.61Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>`,
    tags: ["heart", "love", "like", "favorite"],
  },
  {
    id: 18,
    name: "Star",
    category: "Social",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>`,
    tags: ["star", "favorite", "rating", "bookmark"],
  },
  {
    id: 19,
    name: "Share",
    category: "Social",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="2"/><circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="2"/><circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="2"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke="currentColor" strokeWidth="2"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke="currentColor" strokeWidth="2"/></svg>`,
    tags: ["share", "send", "forward", "distribute"],
  },
  {
    id: 20,
    name: "Thumbs Up",
    category: "Social",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 9V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V9M14 9H18.5C19.8807 9 21 10.1193 21 11.5V12.5C21 13.8807 19.8807 15 18.5 15H14M14 9V15M14 15H10V21H3V15H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>`,
    tags: ["thumbs", "up", "like", "approve"],
  },

  // People Icons
  {
    id: 21,
    name: "User",
    category: "People",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>`,
    tags: ["user", "person", "profile", "account"],
  },
  {
    id: 22,
    name: "Users",
    category: "People",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>`,
    tags: ["users", "people", "group", "team"],
  },
  {
    id: 23,
    name: "User Plus",
    category: "People",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 1.17157 16.1716C0.421427 16.9217 0 17.9391 0 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="8.5" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="20" y1="8" x2="20" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="23" y1="11" x2="17" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>`,
    tags: ["user", "add", "plus", "invite"],
  },

  // Business Icons
  {
    id: 24,
    name: "Briefcase",
    category: "Business",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/><path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>`,
    tags: ["briefcase", "work", "business", "job"],
  },
  {
    id: 25,
    name: "Calendar",
    category: "Business",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/><line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>`,
    tags: ["calendar", "date", "schedule", "time"],
  },
  {
    id: 26,
    name: "Clock",
    category: "Business",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>`,
    tags: ["clock", "time", "schedule", "hour"],
  },
  {
    id: 27,
    name: "Dollar Sign",
    category: "Business",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="1" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6312 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6312 13.6815 18 14.5717 18 15.5C18 16.4283 17.6312 17.3185 16.9749 17.9749C16.3185 18.6312 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>`,
    tags: ["dollar", "money", "currency", "price"],
  },

  // Technology Icons
  {
    id: 28,
    name: "Monitor",
    category: "Technology",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/><line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>`,
    tags: ["monitor", "computer", "screen", "display"],
  },
  {
    id: 29,
    name: "Smartphone",
    category: "Technology",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/><line x1="12" y1="18" x2="12.01" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>`,
    tags: ["smartphone", "mobile", "phone", "device"],
  },
  {
    id: 30,
    name: "Laptop",
    category: "Technology",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="22" y1="19" x2="2" y2="19" stroke="currentColor" strokeWidth="2"/><rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/></svg>`,
    tags: ["laptop", "computer", "notebook", "portable"],
  },
  {
    id: 31,
    name: "Tablet",
    category: "Technology",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="2" width="16" height="20" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/><line x1="12" y1="18" x2="12.01" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>`,
    tags: ["tablet", "ipad", "device", "touch"],
  },
  {
    id: 32,
    name: "Wifi",
    category: "Technology",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.42 9C3.28 6.8 5.97 5.5 9 5.5C12.03 5.5 14.72 6.8 16.58 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 12.55C6.24 11.18 8.04 10.5 10 10.5C11.96 10.5 13.76 11.18 15 12.55" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8.53 16.11C9.06 15.65 9.51 15.5 10 15.5C10.49 15.5 10.94 15.65 11.47 16.11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="20" x2="12.01" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>`,
    tags: ["wifi", "wireless", "internet", "connection"],
  },

  // Media Icons
  {
    id: 33,
    name: "Play",
    category: "Media",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="5,3 19,12 5,21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>`,
    tags: ["play", "start", "video", "audio"],
  },
  {
    id: 34,
    name: "Pause",
    category: "Media",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="4" width="4" height="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><rect x="14" y="4" width="4" height="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>`,
    tags: ["pause", "stop", "video", "audio"],
  },
  {
    id: 35,
    name: "Volume",
    category: "Media",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="11,5 6,9 2,9 2,15 6,15 11,19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19.07 4.93C20.9447 6.80528 21.9979 9.34836 21.9979 12C21.9979 14.6516 20.9447 17.1947 19.07 19.07M15.54 8.46C16.4774 9.39764 17.0039 10.6692 17.0039 12C17.0039 13.3308 16.4774 14.6024 15.54 15.54" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>`,
    tags: ["volume", "sound", "audio", "speaker"],
  },
  {
    id: 36,
    name: "Image",
    category: "Media",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/><circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2"/><polyline points="21,15 16,10 5,21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>`,
    tags: ["image", "picture", "photo", "gallery"],
  },

  // Navigation Icons
  {
    id: 37,
    name: "Map Pin",
    category: "Navigation",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/></svg>`,
    tags: ["map", "pin", "location", "place"],
  },
  {
    id: 38,
    name: "Navigation",
    category: "Navigation",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="3,11 22,2 13,21 11,13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>`,
    tags: ["navigation", "compass", "direction", "gps"],
  },
  {
    id: 39,
    name: "Globe",
    category: "Navigation",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="2"/></svg>`,
    tags: ["globe", "world", "earth", "international"],
  },

  // Weather Icons
  {
    id: 40,
    name: "Sun",
    category: "Weather",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/><line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>`,
    tags: ["sun", "sunny", "weather", "bright"],
  },
  {
    id: 41,
    name: "Cloud",
    category: "Weather",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 10H16.74C16.24 6.67 13.5 4 10 4C6.5 4 3.76 6.67 3.26 10H2C0.9 10 0 10.9 0 12S0.9 14 2 14H18C19.1 14 20 13.1 20 12S19.1 10 18 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>`,
    tags: ["cloud", "cloudy", "weather", "sky"],
  },
  {
    id: 42,
    name: "Rain",
    category: "Weather",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="16" y1="13" x2="16" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="8" y1="13" x2="8" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="12" y1="15" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M20 16.58C21.0512 16.1196 21.9121 15.3116 22.4381 14.2916C22.9641 13.2715 23.1231 12.1016 22.8886 10.9787C22.6541 9.85581 22.0402 8.8499 21.1420 8.1338C20.2438 7.41771 19.1125 7.03771 17.95 7.05999H16.74C16.2397 5.18252 15.2983 3.47584 13.9991 2.10749C12.6999 0.739133 11.0881 -0.0123973 9.36 -0.0123973C7.63185 -0.0123973 6.02011 0.739133 4.72091 2.10749C3.42171 3.47584 2.48026 5.18252 2.14091 6.85087C1.80156 8.51922 1.65394 10.2259 1.65394 11.95C1.65394 13.6741 1.80156 15.3808 2.14091 17.0508C2.48026 18.7192 2.89488 20.2259 3.55588 21.5808C4.21688 22.9357 5.08661 23.9974 6.14741 24.7474C7.20821 25.4974 8.36894 25.9999 9.59 25.9999C10.8111 25.9999 11.9718 25.4974 13.0326 24.7474C14.0934 23.9974 14.9632 22.9357 15.6242 21.5808C16.2852 20.2259 16.6998 18.7192 16.6998 17.0508C16.6998 15.3808 16.2852 13.6741 15.6242 12.3192C14.9632 10.9643 14.0934 9.9026 13.0326 8.64741C12.0918 7.49221 11.2211 6.62148 10.47 5.97068C9.71889 5.31988 8.94816 4.81736 8.19736 4.57736C7.44656 4.33736 6.67583 4.28974 5.91299 4.37909C5.15015 4.46844 4.43981 4.68882 4.01541 5.06321C3.59101 5.4376 3.3434 5.93913 3.25375 6.47202C3.1641 7.00491 3.21588 7.54854 3.40307 8.03774C3.59026 8.52694 3.87469 8.92846 4.24853 9.20677C4.62237 9.48508 4.93271 9.7375 5.12 9.97C5.30729 10.2025 5.52767 10.4129 5.76051 10.5902C6.00335 10.7675 6.28373 10.8728 6.58 10.8728C6.87627 10.8728 7.15665 10.7675 7.39949 10.5902C7.64233 10.4129 7.86271 10.2025 8.05 9.97C8.23729 9.7375 8.54767 9.48508 8.92151 9.20677C9.29535 8.92846 9.60569 8.52694 9.79288 8.03774C9.98007 7.54854 10.0318 7.00491 10.219 6.47202C10.4062 5.93913 10.6266 5.4376 10.9905 5.06321C11.3544 4.68882 11.6648 4.33736 11.9421 4.19736C12.2194 4.05736 12.5439 4.00974 12.88 4.09909C13.2161 4.18844 13.5365 4.44088 13.86 4.82"/></svg>`,
    tags: ["wifi", "wireless", "internet", "connection"],
  },
]

export default function IconsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedIcons, setSelectedIcons] = useState<number[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [iconColor, setIconColor] = useState("#000000")
  const [iconSize, setIconSize] = useState(24)
  const [strokeWidth, setStrokeWidth] = useState(2)

  const filteredIcons = useMemo(() => {
    const filtered = sampleIcons.filter((icon) => {
      const matchesSearch =
        icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        icon.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === "All" || icon.category === selectedCategory
      const matchesFavorites = !showFavoritesOnly || favorites.includes(icon.id)

      return matchesSearch && matchesCategory && matchesFavorites
    })

    return filtered
  }, [searchTerm, selectedCategory, showFavoritesOnly, favorites])

  const categories = ["All", ...Array.from(new Set(sampleIcons.map((icon) => icon.category)))]

  const handleBulkDownload = () => {
    if (selectedIcons.length === 0) {
      toast.error("Please select icons to download")
      return
    }

    const selectedIconsData = sampleIcons.filter((icon) => selectedIcons.includes(icon.id))
    const zip = selectedIconsData.map((icon) => {
      const customizedSvg = icon.svg
        .replace(/stroke="currentColor"/g, `stroke="${iconColor}"`)
        .replace(/width="24"/g, `width="${iconSize}"`)
        .replace(/height="24"/g, `height="${iconSize}"`)
        .replace(/strokeWidth="2"/g, `strokeWidth="${strokeWidth}"`)

      return {
        name: `${icon.name.toLowerCase().replace(/\s+/g, "-")}.svg`,
        content: customizedSvg,
      }
    })

    const zipContent = zip.map((file) => `${file.name}:\n${file.content}`).join("\n\n---\n\n")
    const blob = new Blob([zipContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `icons-${selectedIcons.length}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast.success(`Downloaded ${selectedIcons.length} icons`)
    setSelectedIcons([])
  }

  const toggleFavorite = (iconId: number) => {
    setFavorites((prev) => (prev.includes(iconId) ? prev.filter((id) => id !== iconId) : [...prev, iconId]))
    toast.success(favorites.includes(iconId) ? "Removed from favorites" : "Added to favorites")
  }

  const copyToClipboard = (svg: string, iconName: string) => {
    const customizedSvg = svg
      .replace(/stroke="currentColor"/g, `stroke="${iconColor}"`)
      .replace(/width="24"/g, `width="${iconSize}"`)
      .replace(/height="24"/g, `height="${iconSize}"`)
      .replace(/strokeWidth="2"/g, `strokeWidth="${strokeWidth}"`)

    navigator.clipboard.writeText(customizedSvg)
    toast.success(`${iconName} copied to clipboard!`)
  }

  const downloadSVG = (svg: string, iconName: string) => {
    const customizedSvg = svg
      .replace(/stroke="currentColor"/g, `stroke="${iconColor}"`)
      .replace(/width="24"/g, `width="${iconSize}"`)
      .replace(/height="24"/g, `height="${iconSize}"`)
      .replace(/strokeWidth="2"/g, `strokeWidth="${strokeWidth}"`)

    const blob = new Blob([customizedSvg], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${iconName.toLowerCase().replace(/\s+/g, "-")}.svg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success(`${iconName} downloaded!`)
  }

  const selectAllVisible = () => {
    const visibleIds = filteredIcons.map((icon) => icon.id)
    setSelectedIcons((prev) => {
      const newSelection = [...new Set([...prev, ...visibleIds])]
      return newSelection
    })
  }

  const clearSelection = () => {
    setSelectedIcons([])
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">SVG Icon Library</h1>
          <p className="text-xl text-muted-foreground">Professional SVG icons with customization options</p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Check className="w-5 h-5" />
              Customize Icons
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={iconColor}
                    onChange={(e) => setIconColor(e.target.value)}
                    className="w-10 h-10 rounded border"
                  />
                  <Input
                    type="text"
                    value={iconColor}
                    onChange={(e) => setIconColor(e.target.value)}
                    className="flex-1"
                    placeholder="#000000"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Size: {iconSize}px</label>
                <input
                  type="range"
                  min="16"
                  max="64"
                  value={iconSize}
                  onChange={(e) => setIconSize(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Stroke Width: {strokeWidth}px</label>
                <input
                  type="range"
                  min="1"
                  max="4"
                  step="0.5"
                  value={strokeWidth}
                  onChange={(e) => setStrokeWidth(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search icons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="favorites-only" checked={showFavoritesOnly} onCheckedChange={setShowFavoritesOnly} />
            <label htmlFor="favorites-only" className="text-sm font-medium">
              Favorites only ({favorites.length})
            </label>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "secondary"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {selectedIcons.length > 0 && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {selectedIcons.length} icon{selectedIcons.length !== 1 ? "s" : ""} selected
                </span>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={selectAllVisible}>
                    <Check className="w-4 h-4 mr-2" />
                    Select All Visible
                  </Button>
                  <Button size="sm" variant="outline" onClick={clearSelection}>
                    <Check className="w-4 h-4 mr-2" />
                    Clear Selection
                  </Button>
                  <Button size="sm" onClick={handleBulkDownload}>
                    <Download className="w-4 h-4 mr-2" />
                    Download Selected
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {filteredIcons.map((icon) => (
            <Card key={icon.id} className="group hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Checkbox
                    checked={selectedIcons.includes(icon.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedIcons((prev) => [...prev, icon.id])
                      } else {
                        setSelectedIcons((prev) => prev.filter((id) => id !== icon.id))
                      }
                    }}
                  />
                  <Button size="sm" variant="ghost" onClick={() => toggleFavorite(icon.id)} className="p-1 h-auto">
                    <Heart
                      className={`w-4 h-4 ${favorites.includes(icon.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
                    />
                  </Button>
                </div>

                <div className="flex justify-center mb-3">
                  <div
                    className="w-12 h-12 flex items-center justify-center"
                    style={{ color: iconColor }}
                    dangerouslySetInnerHTML={{
                      __html: icon.svg
                        .replace(/width="24"/g, `width="${iconSize}"`)
                        .replace(/height="24"/g, `height="${iconSize}"`)
                        .replace(/strokeWidth="2"/g, `strokeWidth="${strokeWidth}"`),
                    }}
                  />
                </div>

                <h3 className="font-medium text-sm text-center mb-2">{icon.name}</h3>
                <Badge variant="secondary" className="text-xs w-full justify-center mb-3">
                  {icon.category}
                </Badge>

                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(icon.svg, icon.name)}
                    className="flex-1"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => downloadSVG(icon.svg, icon.name)}
                    className="flex-1"
                  >
                    <Download className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredIcons.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No icons found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
