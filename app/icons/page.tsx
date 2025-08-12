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
  
{
    id: 43,
    name: "align-left (1)",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>align-left</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-310.000000, -208.000000)" fill="#000000">
            <path d="M328,232 L312,232 C310.896,232 310,232.896 310,234 C310,235.104 310.896,236 312,236 L328,236 C329.104,236 330,235.104 330,234 C330,232.896 329.104,232 328,232 L328,232 Z M336,224 L312,224 C310.896,224 310,224.896 310,226 C310,227.104 310.896,228 312,228 L336,228 C337.104,228 338,227.104 338,226 C338,224.896 337.104,224 336,224 L336,224 Z M312,220 L328,220 C329.104,220 330,219.104 330,218 C330,216.896 329.104,216 328,216 L312,216 C310.896,216 310,216.896 310,218 C310,219.104 310.896,220 312,220 L312,220 Z M312,212 L336,212 C337.104,212 338,211.104 338,210 C338,208.896 337.104,208 336,208 L312,208 C310.896,208 310,208.896 310,210 C310,211.104 310.896,212 312,212 L312,212 Z" id="align-left" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 44,
    name: "align-left",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 -1 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>align-left</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-308.000000, -206.000000)" fill="#000000">
            <path d="M335,222 L309,222 C308.447,222 308,222.448 308,223 C308,223.553 308.447,224 309,224 L335,224 C335.553,224 336,223.553 336,223 C336,222.448 335.553,222 335,222 L335,222 Z M324,230 L309,230 C308.447,230 308,230.447 308,231 C308,231.553 308.447,232 309,232 L324,232 C324.553,232 325,231.553 325,231 C325,230.447 324.553,230 324,230 L324,230 Z M309,208 L335,208 C335.553,208 336,207.553 336,207 C336,206.448 335.553,206 335,206 L309,206 C308.447,206 308,206.448 308,207 C308,207.553 308.447,208 309,208 L309,208 Z M309,216 L327,216 C327.553,216 328,215.553 328,215 C328,214.448 327.553,214 327,214 L309,214 C308.447,214 308,214.448 308,215 C308,215.553 308.447,216 309,216 L309,216 Z" id="align-left" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 45,
    name: "align-right (1)",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 -1 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>align-right</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-464.000000, -672.000000)" fill="#000000">
            <path d="M469,688 L481.273,688 L477.282,691.299 C476.89,691.69 476.89,692.326 477.282,692.718 C477.676,693.11 478.313,693.11 478.706,692.718 L484.686,687.776 C484.896,687.566 484.985,687.289 484.971,687.016 C484.985,686.742 484.896,686.465 484.686,686.255 L478.706,681.313 C478.313,680.921 477.676,680.921 477.282,681.313 C476.89,681.705 476.89,682.341 477.282,682.732 L481.235,686 L469,686 C468.447,686 468,686.447 468,687 C468,687.553 468.447,688 469,688 L469,688 Z M494,698 C494,699.104 493.104,700 492,700 L490,700 L490,674 L492,674 C493.104,674 494,674.896 494,676 L494,698 L494,698 Z M488,700 L468,700 C466.896,700 466,699.104 466,698 L466,676 C466,674.896 466.896,674 468,674 L488,674 L488,700 L488,700 Z M492,672 L468,672 C465.791,672 464,673.791 464,676 L464,698 C464,700.209 465.791,702 468,702 L492,702 C494.209,702 496,700.209 496,698 L496,676 C496,673.791 494.209,672 492,672 L492,672 Z" id="align-right" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 46,
    name: "align-right",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 -1 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>align-right</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-466.000000, -674.000000)" fill="#000000">
            <path d="M471,688 L483.273,688 L479.282,684.701 C478.89,684.31 478.89,683.674 479.282,683.282 C479.676,682.89 480.313,682.89 480.706,683.282 L486.687,688.224 C486.896,688.434 486.985,688.711 486.971,688.984 C486.985,689.258 486.896,689.535 486.687,689.745 L480.706,694.687 C480.313,695.079 479.676,695.079 479.282,694.687 C478.89,694.295 478.89,693.659 479.282,693.268 L483.235,690 L471,690 C470.448,690 470,689.553 470,689 C470,688.447 470.448,688 471,688 L471,688 Z M466,678 L466,700 C466,702.209 467.791,704 470,704 L490,704 L490,674 L470,674 C467.791,674 466,675.791 466,678 L466,678 Z M494,674 L492,674 L492,704 L494,704 C496.209,704 498,702.209 498,700 L498,678 C498,675.791 496.209,674 494,674 L494,674 Z" id="align-right" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 47,
    name: "align-top (1)",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="-1 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>align-top</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-413.000000, -671.000000)" fill="#000000">
            <path d="M423.732,689.718 L427,685.765 L427,698 C427,698.553 427.447,699 428,699 C428.553,699 429,698.553 429,698 L429,685.727 L432.299,689.718 C432.69,690.111 433.326,690.111 433.719,689.718 C434.11,689.324 434.11,688.688 433.719,688.294 L428.776,682.313 C428.567,682.104 428.289,682.015 428.016,682.029 C427.742,682.015 427.465,682.104 427.256,682.313 L422.313,688.294 C421.921,688.688 421.921,689.324 422.313,689.718 C422.705,690.111 423.341,690.111 423.732,689.718 L423.732,689.718 Z M441,677 L415,677 L415,675 C415,673.896 415.896,673 417,673 L439,673 C440.104,673 441,673.896 441,675 L441,677 L441,677 Z M441,699 C441,700.104 440.104,701 439,701 L417,701 C415.896,701 415,700.104 415,699 L415,679 L441,679 L441,699 L441,699 Z M439,671 L417,671 C414.791,671 413,672.791 413,675 L413,699 C413,701.209 414.791,703 417,703 L439,703 C441.209,703 443,701.209 443,699 L443,675 C443,672.791 441.209,671 439,671 L439,671 Z" id="align-top" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 48,
    name: "align-top",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="-1 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>align-top</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-415.000000, -673.000000)" fill="#000000">
            <path d="M441,673 L419,673 C416.791,673 415,674.791 415,677 L415,679 L445,679 L445,677 C445,674.791 443.209,673 441,673 L441,673 Z M424.282,690.294 L429.224,684.313 C429.434,684.104 429.711,684.015 429.984,684.029 C430.258,684.015 430.535,684.104 430.745,684.313 L435.687,690.294 C436.079,690.688 436.079,691.324 435.687,691.718 C435.295,692.11 434.659,692.11 434.268,691.718 L431,687.765 L431,700 C431,700.552 430.553,701 430,701 C429.447,701 429,700.552 429,700 L429,687.727 L425.701,691.718 C425.31,692.11 424.674,692.11 424.282,691.718 C423.89,691.324 423.89,690.688 424.282,690.294 L424.282,690.294 Z M415,701 C415,703.209 416.791,705 419,705 L441,705 C443.209,705 445,703.209 445,701 L445,681 L415,681 L415,701 L415,701 Z" id="align-top" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 49,
    name: "arrow-bottom",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="-2 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>arrow-bottom</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-519.000000, -931.000000)" fill="#000000">
            <path d="M543,935 L540,935 L540,937 L543,937 C544.104,937 545,937.896 545,939 L545,959 C545,960.104 544.104,961 543,961 L523,961 C521.896,961 521,960.104 521,959 L521,939 C521,937.896 521.896,937 523,937 L526,937 L526,935 L523,935 C520.791,935 519,936.791 519,939 L519,959 C519,961.209 520.791,963 523,963 L543,963 C545.209,963 547,961.209 547,959 L547,939 C547,936.791 545.209,935 543,935 L543,935 Z M525.343,949.758 L532.242,956.657 C532.451,956.865 532.728,956.954 533,956.939 C533.272,956.954 533.549,956.865 533.758,956.657 L540.657,949.758 C541.048,949.367 541.048,948.733 540.657,948.343 C540.267,947.953 539.633,947.953 539.242,948.343 L534,953.586 L534,932 C534,931.447 533.553,931 533,931 C532.448,931 532,931.447 532,932 L532,953.586 L526.757,948.343 C526.367,947.953 525.733,947.953 525.343,948.343 C524.952,948.733 524.952,949.367 525.343,949.758 L525.343,949.758 Z" id="arrow-bottom" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 50,
    name: "arrow-down-circle (1)",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>arrow-down-circle</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-414.000000, -1089.000000)" fill="#000000">
            <path d="M436.535,1105.88 L430.879,1111.54 C430.639,1111.78 430.311,1111.85 430,1111.79 C429.689,1111.85 429.361,1111.78 429.121,1111.54 L423.465,1105.88 C423.074,1105.49 423.074,1104.86 423.465,1104.46 C423.855,1104.07 424.488,1104.07 424.879,1104.46 L429,1108.59 L429,1098 C429,1097.45 429.448,1097 430,1097 C430.553,1097 431,1097.45 431,1098 L431,1108.59 L435.121,1104.46 C435.512,1104.07 436.146,1104.07 436.535,1104.46 C436.926,1104.86 436.926,1105.49 436.535,1105.88 L436.535,1105.88 Z M430,1089 C421.163,1089 414,1096.16 414,1105 C414,1113.84 421.163,1121 430,1121 C438.837,1121 446,1113.84 446,1105 C446,1096.16 438.837,1089 430,1089 L430,1089 Z" id="arrow-down-circle" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 51,
    name: "arrow-down-circle",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>arrow-down-circle</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-412.000000, -1087.000000)" fill="#000000">
            <path d="M428,1117 C420.268,1117 414,1110.73 414,1103 C414,1095.27 420.268,1089 428,1089 C435.732,1089 442,1095.27 442,1103 C442,1110.73 435.732,1117 428,1117 L428,1117 Z M428,1087 C419.163,1087 412,1094.16 412,1103 C412,1111.84 419.163,1119 428,1119 C436.837,1119 444,1111.84 444,1103 C444,1094.16 436.837,1087 428,1087 L428,1087 Z M433.121,1102.46 L429,1106.59 L429,1096 C429,1095.45 428.553,1095 428,1095 C427.448,1095 427,1095.45 427,1096 L427,1106.59 L422.879,1102.46 C422.488,1102.07 421.855,1102.07 421.465,1102.46 C421.074,1102.86 421.074,1103.49 421.465,1103.88 L427.121,1109.54 C427.361,1109.78 427.689,1109.85 428,1109.79 C428.311,1109.85 428.639,1109.78 428.879,1109.54 L434.535,1103.88 C434.926,1103.49 434.926,1102.86 434.535,1102.46 C434.146,1102.07 433.512,1102.07 433.121,1102.46 L433.121,1102.46 Z" id="arrow-down-circle" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 52,
    name: "arrow-down-square (1)",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>arrow-down-square</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-568.000000, -983.000000)" fill="#000000">
            <path d="M598,1011 C598,1012.1 597.104,1013 596,1013 L572,1013 C570.896,1013 570,1012.1 570,1011 L570,987 C570,985.896 570.896,985 572,985 L596,985 C597.104,985 598,985.896 598,987 L598,1011 L598,1011 Z M596,983 L572,983 C569.791,983 568,984.791 568,987 L568,1011 C568,1013.21 569.791,1015 572,1015 L596,1015 C598.209,1015 600,1013.21 600,1011 L600,987 C600,984.791 598.209,983 596,983 L596,983 Z M589.121,999.465 L585,1003.59 L585,993 C585,992.447 584.553,992 584,992 C583.448,992 583,992.447 583,993 L583,1003.59 L578.879,999.465 C578.488,999.074 577.855,999.074 577.465,999.465 C577.074,999.855 577.074,1000.49 577.465,1000.88 L583.121,1006.54 C583.361,1006.78 583.689,1006.85 584,1006.79 C584.311,1006.85 584.639,1006.78 584.879,1006.54 L590.535,1000.88 C590.926,1000.49 590.926,999.855 590.535,999.465 C590.146,999.074 589.512,999.074 589.121,999.465 L589.121,999.465 Z" id="arrow-down-square" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 53,
    name: "arrow-down-square",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>arrow-down-square</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-570.000000, -985.000000)" fill="#000000">
            <path d="M592.535,1002.88 L586.879,1008.54 C586.639,1008.78 586.311,1008.85 586,1008.79 C585.689,1008.85 585.361,1008.78 585.121,1008.54 L579.465,1002.88 C579.074,1002.49 579.074,1001.855 579.465,1001.465 C579.855,1001.074 580.488,1001.074 580.879,1001.465 L585,1005.59 L585,995 C585,994.447 585.448,994 586,994 C586.553,994 587,994.447 587,995 L587,1005.59 L591.121,1001.465 C591.512,1001.074 592.146,1001.074 592.535,1001.465 C592.926,1001.855 592.926,1002.49 592.535,1002.88 L592.535,1002.88 Z M598,985 L574,985 C571.791,985 570,986.791 570,989 L570,1013 C570,1015.21 571.791,1017 574,1017 L598,1017 C600.209,1017 602,1015.21 602,1013 L602,989 C602,986.791 600.209,985 598,985 L598,985 Z" id="arrow-down-square" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 54,
    name: "arrow-down",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="-4 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>arrow-down</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-525.000000, -937.000000)" fill="#000000">
            <path d="M536,938 C536,937.447 535.553,937 535,937 C534.448,937 534,937.447 534,938 L534,945 L536,945 L536,938 L536,938 Z M543,945 L536,945 L536,959.586 L541.243,954.343 C541.633,953.953 542.267,953.953 542.657,954.343 C543.048,954.733 543.048,955.367 542.657,955.758 L535.758,962.657 C535.549,962.865 535.272,962.954 535,962.94 C534.728,962.954 534.451,962.865 534.243,962.657 L527.344,955.758 C526.953,955.367 526.953,954.733 527.344,954.343 C527.733,953.953 528.367,953.953 528.758,954.343 L534,959.586 L534,945 L527,945 C525.896,945 525,945.896 525,947 L525,963 C525,964.104 525.896,965 527,965 L543,965 C544.104,965 545,964.104 545,963 L545,947 C545,945.896 544.104,945 543,945 L543,945 Z" id="arrow-down" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 55,
    name: "arrow-left (1)",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 -2 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>arrow-left</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-412.000000, -933.000000)" fill="#000000">
            <path d="M438,957 C438,958.104 437.104,959 436,959 L416,959 C414.896,959 414,958.104 414,957 L414,937 C414,935.896 414.896,935 416,935 L436,935 C437.104,935 438,935.896 438,937 L438,940 L440,940 L440,937 C440,934.791 438.209,933 436,933 L416,933 C413.791,933 412,934.791 412,937 L412,957 C412,959.209 413.791,961 416,961 L436,961 C438.209,961 440,959.209 440,957 L440,954 L438,954 L438,957 L438,957 Z M443,946 L421.414,946 L426.657,940.757 C427.048,940.367 427.048,939.733 426.657,939.343 C426.267,938.952 425.633,938.952 425.242,939.343 L418.343,946.242 C418.135,946.451 418.046,946.728 418.06,947 C418.046,947.272 418.135,947.549 418.343,947.758 L425.242,954.657 C425.633,955.048 426.267,955.048 426.657,954.657 C427.048,954.267 427.048,953.633 426.657,953.242 L421.414,948 L443,948 C443.553,948 444,947.553 444,947 C444,946.448 443.553,946 443,946 L443,946 Z" id="arrow-left" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 56,
    name: "arrow-left-circle (1)",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>arrow-left-circle</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-258.000000, -1089.000000)" fill="#000000">
            <path d="M281,1106 L270.414,1106 L274.536,1110.12 C274.926,1110.51 274.926,1111.15 274.536,1111.54 C274.145,1111.93 273.512,1111.93 273.121,1111.54 L267.464,1105.88 C267.225,1105.64 267.15,1105.31 267.205,1105 C267.15,1104.69 267.225,1104.36 267.464,1104.12 L273.121,1098.46 C273.512,1098.07 274.145,1098.07 274.536,1098.46 C274.926,1098.86 274.926,1099.49 274.536,1099.88 L270.414,1104 L281,1104 C281.552,1104 282,1104.45 282,1105 C282,1105.55 281.552,1106 281,1106 L281,1106 Z M274,1089 C265.164,1089 258,1096.16 258,1105 C258,1113.84 265.164,1121 274,1121 C282.836,1121 290,1113.84 290,1105 C290,1096.16 282.836,1089 274,1089 L274,1089 Z" id="arrow-left-circle" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 57,
    name: "arrow-left-circle",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>arrow-left-circle</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-256.000000, -1087.000000)" fill="#000000">
            <path d="M279,1102 L268.414,1102 L272.536,1097.88 C272.926,1097.49 272.926,1096.86 272.536,1096.46 C272.145,1096.07 271.512,1096.07 271.121,1096.46 L265.464,1102.12 C265.225,1102.36 265.15,1102.69 265.205,1103 C265.15,1103.31 265.225,1103.64 265.464,1103.88 L271.121,1109.54 C271.512,1109.93 272.145,1109.93 272.536,1109.54 C272.926,1109.15 272.926,1108.51 272.536,1108.12 L268.414,1104 L279,1104 C279.552,1104 280,1103.55 280,1103 C280,1102.45 279.552,1102 279,1102 L279,1102 Z M272,1117 C264.268,1117 258,1110.73 258,1103 C258,1095.27 264.268,1089 272,1089 C279.732,1089 286,1095.27 286,1103 C286,1110.73 279.732,1117 272,1117 L272,1117 Z M272,1087 C263.164,1087 256,1094.16 256,1103 C256,1111.84 263.164,1119 272,1119 C280.836,1119 288,1111.84 288,1103 C288,1094.16 280.836,1087 272,1087 L272,1087 Z" id="arrow-left-circle" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 58,
    name: "arrow-left-down",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 -9 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>arrow-left-down</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-258.000000, -1202.000000)" fill="#000000">
            <path d="M289.718,1208.22 L283.795,1202.28 C283.404,1201.89 282.768,1201.89 282.376,1202.28 C281.984,1202.68 282,1203.35 282,1204 L282,1207 L266,1207 L266,1204 C266,1203.35 266.016,1202.68 265.624,1202.28 C265.232,1201.89 264.597,1201.89 264.205,1202.28 L258.282,1208.22 C258.073,1208.43 257.983,1208.71 257.998,1208.98 C257.983,1209.26 258.073,1209.54 258.282,1209.75 L264.205,1215.69 C264.597,1216.08 265.232,1216.08 265.624,1215.69 C266.016,1215.29 266,1214.39 266,1214 L266,1211 L282,1211 L282,1214 C282,1214.65 281.984,1215.29 282.376,1215.69 C282.768,1216.08 283.404,1216.08 283.795,1215.69 L289.718,1209.75 C289.927,1209.54 290.017,1209.26 290.002,1208.98 C290.017,1208.71 289.927,1208.43 289.718,1208.22" id="arrow-left-down" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 59,
    name: "arrow-left-right",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 -9 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>arrow-left-right</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-256.000000, -1200.000000)" fill="#000000">
            <path d="M287.718,1206.22 L281.795,1200.28 C281.404,1199.89 280.768,1199.89 280.376,1200.28 C279.984,1200.68 279.984,1201.31 280.376,1201.71 L284.635,1205.98 L259.365,1205.98 L263.624,1201.71 C264.016,1201.31 264.016,1200.68 263.624,1200.28 C263.232,1199.89 262.597,1199.89 262.205,1200.28 L256.282,1206.22 C256.073,1206.43 255.983,1206.71 255.998,1206.98 C255.983,1207.26 256.073,1207.54 256.282,1207.75 L262.205,1213.69 C262.597,1214.08 263.232,1214.08 263.624,1213.69 C264.016,1213.29 264.016,1212.66 263.624,1212.26 L259.365,1207.99 L284.635,1207.99 L280.376,1212.26 C279.984,1212.66 279.984,1213.29 280.376,1213.69 C280.768,1214.08 281.404,1214.08 281.795,1213.69 L287.718,1207.75 C287.927,1207.54 288.017,1207.26 288.002,1206.98 C288.017,1206.71 287.927,1206.43 287.718,1206.22" id="arrow-left-right" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 60,
    name: "arrow-left-square (1)",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>arrow-left-square</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-414.000000, -985.000000)" fill="#000000">
            <path d="M436,1002 L425.414,1002 L429.535,1006.12 C429.926,1006.51 429.926,1007.15 429.535,1007.54 C429.145,1007.93 428.512,1007.93 428.121,1007.54 L422.465,1001.879 C422.225,1001.639 422.15,1001.311 422.205,1001 C422.15,1000.689 422.225,1000.361 422.465,1000.121 L428.121,994.465 C428.512,994.074 429.145,994.074 429.535,994.465 C429.926,994.855 429.926,995.488 429.535,995.879 L425.414,1000 L436,1000 C436.553,1000 437,1000.448 437,1001 C437,1001.553 436.553,1002 436,1002 L436,1002 Z M442,985 L418,985 C415.791,985 414,986.791 414,989 L414,1013 C414,1015.21 415.791,1017 418,1017 L442,1017 C444.209,1017 446,1015.21 446,1013 L446,989 C446,986.791 444.209,985 442,985 L442,985 Z" id="arrow-left-square" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 61,
    name: "arrow-left-square",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>arrow-left-square</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-412.000000, -983.000000)" fill="#000000">
            <path d="M434,998 L423.414,998 L427.535,993.879 C427.926,993.488 427.926,992.855 427.535,992.465 C427.145,992.074 426.512,992.074 426.121,992.465 L420.465,998.121 C420.225,998.361 420.15,998.689 420.205,999 C420.15,999.311 420.225,999.639 420.465,999.879 L426.121,1005.54 C426.512,1005.93 427.145,1005.93 427.535,1005.54 C427.926,1005.15 427.926,1004.51 427.535,1004.12 L423.414,1000 L434,1000 C434.553,1000 435,999.553 435,999 C435,998.448 434.553,998 434,998 L434,998 Z M442,1011 C442,1012.1 441.104,1013 440,1013 L416,1013 C414.896,1013 414,1012.1 414,1011 L414,987 C414,985.896 414.896,985 416,985 L440,985 C441.104,985 442,985.896 442,987 L442,1011 L442,1011 Z M440,983 L416,983 C413.791,983 412,984.791 412,987 L412,1011 C412,1013.21 413.791,1015 416,1015 L440,1015 C442.209,1015 444,1013.21 444,1011 L444,987 C444,984.791 442.209,983 440,983 L440,983 Z" id="arrow-left-square" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 62,
    name: "arrow-left",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 -4 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>arrow-left</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-416.000000, -939.000000)" fill="#000000">
            <path d="M443,948 L436,948 L436,950 L443,950 C443.553,950 444,949.553 444,949 C444,948.448 443.553,948 443,948 L443,948 Z M426.657,955.243 C427.047,955.633 427.047,956.267 426.657,956.657 C426.267,957.048 425.633,957.048 425.242,956.657 L418.343,949.758 C418.135,949.549 418.046,949.272 418.06,949 C418.046,948.728 418.135,948.451 418.343,948.243 L425.242,941.344 C425.633,940.953 426.267,940.953 426.657,941.344 C427.047,941.733 427.047,942.367 426.657,942.758 L421.414,948 L436,948 L436,941 C436,939.896 435.104,939 434,939 L418,939 C416.896,939 416,939.896 416,941 L416,957 C416,958.104 416.896,959 418,959 L434,959 C435.104,959 436,958.104 436,957 L436,950 L421.414,950 L426.657,955.243 L426.657,955.243 Z" id="arrow-left" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 63,
    name: "arrow-right (1)",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 -2 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>arrow-right</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-360.000000, -933.000000)" fill="#000000">
            <path d="M388,933 L368,933 C365.791,933 364,934.791 364,937 L364,941 L366,941 L366,937 C366,935.896 366.896,935 368,935 L388,935 C389.104,935 390,935.896 390,937 L390,957 C390,958.104 389.104,959 388,959 L368,959 C366.896,959 366,958.104 366,957 L366,953 L364,953 L364,957 C364,959.209 365.791,961 368,961 L388,961 C390.209,961 392,959.209 392,957 L392,937 C392,934.791 390.209,933 388,933 L388,933 Z M377.343,953.243 C376.953,953.633 376.953,954.267 377.343,954.657 C377.733,955.048 378.367,955.048 378.758,954.657 L385.657,947.758 C385.865,947.549 385.954,947.272 385.94,947 C385.954,946.728 385.865,946.451 385.657,946.243 L378.758,939.344 C378.367,938.953 377.733,938.953 377.343,939.344 C376.953,939.733 376.953,940.367 377.343,940.758 L382.586,946 L361,946 C360.447,946 360,946.448 360,947 C360,947.553 360.447,948 361,948 L382.586,948 L377.343,953.243 L377.343,953.243 Z" id="arrow-right" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 64,
    name: "arrow-right-circle (1)",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>arrow-right-circle</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-308.000000, -1087.000000)" fill="#000000">
            <path d="M324,1117 C316.268,1117 310,1110.73 310,1103 C310,1095.27 316.268,1089 324,1089 C331.732,1089 338,1095.27 338,1103 C338,1110.73 331.732,1117 324,1117 L324,1117 Z M324,1087 C315.163,1087 308,1094.16 308,1103 C308,1111.84 315.163,1119 324,1119 C332.837,1119 340,1111.84 340,1103 C340,1094.16 332.837,1087 324,1087 L324,1087 Z M330.535,1102.12 L324.879,1096.46 C324.488,1096.07 323.855,1096.07 323.465,1096.46 C323.074,1096.86 323.074,1097.49 323.465,1097.88 L327.586,1102 L317,1102 C316.447,1102 316,1102.45 316,1103 C316,1103.55 316.447,1104 317,1104 L327.586,1104 L323.465,1108.12 C323.074,1108.51 323.074,1109.15 323.465,1109.54 C323.855,1109.93 324.488,1109.93 324.879,1109.54 L330.535,1103.88 C330.775,1103.64 330.85,1103.31 330.795,1103 C330.85,1102.69 330.775,1102.36 330.535,1102.12 L330.535,1102.12 Z" id="arrow-right-circle" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 65,
    name: "arrow-right-circle",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>arrow-right-circle</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-310.000000, -1089.000000)" fill="#000000">
            <path d="M332.535,1105.88 L326.879,1111.54 C326.488,1111.93 325.855,1111.93 325.465,1111.54 C325.074,1111.15 325.074,1110.51 325.465,1110.12 L329.586,1106 L319,1106 C318.447,1106 318,1105.55 318,1105 C318,1104.45 318.447,1104 319,1104 L329.586,1104 L325.465,1099.88 C325.074,1099.49 325.074,1098.86 325.465,1098.46 C325.855,1098.07 326.488,1098.07 326.879,1098.46 L332.535,1104.12 C332.775,1104.36 332.85,1104.69 332.795,1105 C332.85,1105.31 332.775,1105.64 332.535,1105.88 L332.535,1105.88 Z M326,1089 C317.163,1089 310,1096.16 310,1105 C310,1113.84 317.163,1121 326,1121 C334.837,1121 342,1113.84 342,1105 C342,1096.16 334.837,1089 326,1089 L326,1089 Z" id="arrow-right-circle" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 66,
    name: "arrow-right-square (1)",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>arrow-right-square</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-466.000000, -985.000000)" fill="#000000">
            <path d="M489.535,1001.879 L483.879,1007.54 C483.488,1007.93 482.855,1007.93 482.465,1007.54 C482.074,1007.14 482.074,1006.51 482.465,1006.12 L486.586,1002 L476,1002 C475.447,1002 475,1001.552 475,1001 C475,1000.447 475.447,1000 476,1000 L486.586,1000 L482.465,995.879 C482.074,995.488 482.074,994.854 482.465,994.465 C482.855,994.074 483.488,994.074 483.879,994.465 L489.535,1000.121 C489.775,1000.361 489.85,1000.689 489.795,1001 C489.85,1001.311 489.775,1001.639 489.535,1001.879 L489.535,1001.879 Z M494,985 L470,985 C467.791,985 466,986.791 466,989 L466,1013 C466,1015.21 467.791,1017 470,1017 L494,1017 C496.209,1017 498,1015.21 498,1013 L498,989 C498,986.791 496.209,985 494,985 L494,985 Z" id="arrow-right-square" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 67,
    name: "arrow-right-square",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>arrow-right-square</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-464.000000, -983.000000)" fill="#000000">
            <path d="M494,1011 C494,1012.1 493.104,1013 492,1013 L468,1013 C466.896,1013 466,1012.1 466,1011 L466,987 C466,985.896 466.896,985 468,985 L492,985 C493.104,985 494,985.896 494,987 L494,1011 L494,1011 Z M492,983 L468,983 C465.791,983 464,984.791 464,987 L464,1011 C464,1013.21 465.791,1015 468,1015 L492,1015 C494.209,1015 496,1013.21 496,1011 L496,987 C496,984.791 494.209,983 492,983 L492,983 Z M487.535,998.121 L481.879,992.465 C481.488,992.074 480.855,992.074 480.465,992.465 C480.074,992.854 480.074,993.488 480.465,993.879 L484.586,998 L474,998 C473.447,998 473,998.447 473,999 C473,999.552 473.447,1000 474,1000 L484.586,1000 L480.465,1004.12 C480.074,1004.51 480.074,1005.14 480.465,1005.54 C480.855,1005.93 481.488,1005.93 481.879,1005.54 L487.535,999.879 C487.775,999.639 487.85,999.311 487.795,999 C487.85,998.689 487.775,998.361 487.535,998.121 L487.535,998.121 Z" id="arrow-right-square" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 68,
    name: "arrow-right",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 -4 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>arrow-right</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-362.000000, -939.000000)" fill="#000000">
            <path d="M363,948 C362.447,948 362,948.448 362,949 C362,949.553 362.447,950 363,950 L370,950 L370,948 L363,948 L363,948 Z M388,939 L372,939 C370.896,939 370,939.896 370,941 L370,948 L384.586,948 L379.343,942.758 C378.953,942.367 378.953,941.733 379.343,941.344 C379.733,940.953 380.367,940.953 380.758,941.344 L387.657,948.243 C387.865,948.451 387.954,948.728 387.94,949 C387.954,949.272 387.865,949.549 387.657,949.758 L380.758,956.657 C380.367,957.048 379.733,957.048 379.343,956.657 C378.953,956.267 378.953,955.633 379.343,955.243 L384.586,950 L370,950 L370,957 C370,958.104 370.896,959 372,959 L388,959 C389.104,959 390,958.104 390,957 L390,941 C390,939.896 389.104,939 388,939 L388,939 Z" id="arrow-right" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 69,
    name: "arrow-top",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="-2 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>arrow-top</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-466.000000, -931.000000)" fill="#000000">
            <path d="M490,931 L470,931 C467.791,931 466,932.791 466,935 L466,955 C466,957.209 467.791,959 470,959 L473,959 L473,957 L470,957 C468.896,957 468,956.104 468,955 L468,935 C468,933.896 468.896,933 470,933 L490,933 C491.104,933 492,933.896 492,935 L492,955 C492,956.104 491.104,957 490,957 L487,957 L487,959 L490,959 C492.209,959 494,957.209 494,955 L494,935 C494,932.791 492.209,931 490,931 L490,931 Z M487.657,944.243 L480.758,937.343 C480.549,937.135 480.272,937.046 480,937.06 C479.728,937.046 479.451,937.135 479.243,937.343 L472.343,944.243 C471.952,944.633 471.952,945.267 472.343,945.657 C472.733,946.048 473.367,946.048 473.758,945.657 L479,940.414 L479,962 C479,962.553 479.447,963 480,963 C480.552,963 481,962.553 481,962 L481,940.414 L486.243,945.657 C486.633,946.048 487.267,946.048 487.657,945.657 C488.048,945.267 488.048,944.633 487.657,944.243 L487.657,944.243 Z" id="arrow-top" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 70,
    name: "arrow-up-circle (1)",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>arrow-up-circle</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-360.000000, -1087.000000)" fill="#000000">
            <path d="M376,1117 C368.268,1117 362,1110.73 362,1103 C362,1095.27 368.268,1089 376,1089 C383.732,1089 390,1095.27 390,1103 C390,1110.73 383.732,1117 376,1117 L376,1117 Z M376,1087 C367.163,1087 360,1094.16 360,1103 C360,1111.84 367.163,1119 376,1119 C384.837,1119 392,1111.84 392,1103 C392,1094.16 384.837,1087 376,1087 L376,1087 Z M376.879,1096.46 C376.639,1096.22 376.311,1096.15 376,1096.21 C375.689,1096.15 375.361,1096.22 375.121,1096.46 L369.465,1102.12 C369.074,1102.51 369.074,1103.14 369.465,1103.54 C369.854,1103.93 370.488,1103.93 370.879,1103.54 L375,1099.41 L375,1110 C375,1110.55 375.447,1111 376,1111 C376.553,1111 377,1110.55 377,1110 L377,1099.41 L381.121,1103.54 C381.512,1103.93 382.145,1103.93 382.535,1103.54 C382.926,1103.14 382.926,1102.51 382.535,1102.12 L376.879,1096.46 L376.879,1096.46 Z" id="arrow-up-circle" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 71,
    name: "arrow-up-circle",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>arrow-up-circle</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-362.000000, -1089.000000)" fill="#000000">
            <path d="M384.535,1105.54 C384.145,1105.93 383.512,1105.93 383.121,1105.54 L379,1101.41 L379,1112 C379,1112.55 378.553,1113 378,1113 C377.447,1113 377,1112.55 377,1112 L377,1101.41 L372.879,1105.54 C372.488,1105.93 371.854,1105.93 371.465,1105.54 C371.074,1105.14 371.074,1104.51 371.465,1104.12 L377.121,1098.46 C377.361,1098.22 377.689,1098.15 378,1098.21 C378.311,1098.15 378.639,1098.22 378.879,1098.46 L384.535,1104.12 C384.926,1104.51 384.926,1105.14 384.535,1105.54 L384.535,1105.54 Z M378,1089 C369.163,1089 362,1096.16 362,1105 C362,1113.84 369.163,1121 378,1121 C386.837,1121 394,1113.84 394,1105 C394,1096.16 386.837,1089 378,1089 L378,1089 Z" id="arrow-up-circle" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 72,
    name: "arrow-up-down (1)",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="-9 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>arrow-up-down</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-211.000000, -1191.000000)" fill="#000000">
            <path d="M223.263,1215.38 L218.991,1219.63 L218.991,1194.37 L223.263,1198.62 C223.656,1199.02 224.293,1199.02 224.687,1198.62 C225.08,1198.23 225.08,1197.6 224.687,1197.2 L218.747,1191.28 C218.537,1191.07 218.259,1190.98 217.984,1191 C217.71,1190.98 217.432,1191.07 217.222,1191.28 L211.283,1197.2 C210.89,1197.6 210.89,1198.23 211.283,1198.62 C211.676,1199.02 212.313,1199.02 212.707,1198.62 L216.978,1194.37 L216.978,1219.63 L212.707,1215.38 C212.313,1214.98 211.676,1214.98 211.283,1215.38 C210.89,1215.77 210.89,1216.4 211.283,1216.8 L217.222,1222.72 C217.432,1222.93 217.71,1223.02 217.984,1223 C218.259,1223.02 218.537,1222.93 218.747,1222.72 L224.687,1216.8 C225.08,1216.4 225.08,1215.77 224.687,1215.38 C224.293,1214.98 223.656,1214.98 223.263,1215.38" id="arrow-up-down" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 73,
    name: "arrow-up-down",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="-9 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>arrow-up-down</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-213.000000, -1193.000000)" fill="#000000">
            <path d="M225,1217 L222,1217 L222,1201 L225,1201 C225.643,1201 226.293,1201.02 226.687,1200.62 C227.08,1200.23 227.08,1199.6 226.687,1199.2 L220.747,1193.28 C220.537,1193.07 220.259,1192.98 219.984,1193 C219.71,1192.98 219.432,1193.07 219.222,1193.28 L213.283,1199.2 C212.89,1199.6 212.89,1200.23 213.283,1200.62 C213.676,1201.02 214.294,1201 215,1201 L218,1201 L218,1217 L215,1217 C214.357,1217 213.676,1216.98 213.283,1217.38 C212.89,1217.77 212.89,1218.4 213.283,1218.8 L219.222,1224.72 C219.432,1224.93 219.71,1225.02 219.984,1225 C220.259,1225.02 220.537,1224.93 220.747,1224.72 L226.687,1218.8 C227.08,1218.4 227.08,1217.77 226.687,1217.38 C226.293,1216.98 225.737,1217 225,1217" id="arrow-up-down" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 74,
    name: "arrow-up-square (1)",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>arrow-up-square</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-516.000000, -983.000000)" fill="#000000">
            <path d="M546,1011 C546,1012.1 545.104,1013 544,1013 L520,1013 C518.896,1013 518,1012.1 518,1011 L518,987 C518,985.896 518.896,985 520,985 L544,985 C545.104,985 546,985.896 546,987 L546,1011 L546,1011 Z M544,983 L520,983 C517.791,983 516,984.791 516,987 L516,1011 C516,1013.21 517.791,1015 520,1015 L544,1015 C546.209,1015 548,1013.21 548,1011 L548,987 C548,984.791 546.209,983 544,983 L544,983 Z M532.879,991.465 C532.639,991.225 532.311,991.15 532,991.205 C531.689,991.15 531.361,991.225 531.121,991.465 L525.465,997.121 C525.074,997.512 525.074,998.146 525.465,998.535 C525.854,998.926 526.488,998.926 526.879,998.535 L531,994.414 L531,1005 C531,1005.55 531.447,1006 532,1006 C532.552,1006 533,1005.55 533,1005 L533,994.414 L537.121,998.535 C537.512,998.926 538.145,998.926 538.535,998.535 C538.926,998.146 538.926,997.512 538.535,997.121 L532.879,991.465 L532.879,991.465 Z" id="arrow-up-square" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 75,
    name: "arrow-up-square",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>arrow-up-square</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-518.000000, -985.000000)" fill="#000000">
            <path d="M540.535,1000.535 C540.145,1000.926 539.512,1000.926 539.121,1000.535 L535,996.414 L535,1007 C535,1007.55 534.552,1008 534,1008 C533.447,1008 533,1007.55 533,1007 L533,996.414 L528.879,1000.535 C528.488,1000.926 527.854,1000.926 527.465,1000.535 C527.074,1000.146 527.074,999.512 527.465,999.121 L533.121,993.465 C533.361,993.225 533.689,993.15 534,993.205 C534.311,993.15 534.639,993.225 534.879,993.465 L540.535,999.121 C540.926,999.512 540.926,1000.146 540.535,1000.535 L540.535,1000.535 Z M546,985 L522,985 C519.791,985 518,986.791 518,989 L518,1013 C518,1015.21 519.791,1017 522,1017 L546,1017 C548.209,1017 550,1015.21 550,1013 L550,989 C550,986.791 548.209,985 546,985 L546,985 Z" id="arrow-up-square" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 76,
    name: "arrow-up",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="-4 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>arrow-up</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-472.000000, -937.000000)" fill="#000000">
            <path d="M481,964 C481,964.553 481.447,965 482,965 C482.552,965 483,964.553 483,964 L483,957 L481,957 L481,964 L481,964 Z M490,937 L474,937 C472.896,937 472,937.896 472,939 L472,955 C472,956.104 472.896,957 474,957 L481,957 L481,942.414 L475.757,947.657 C475.367,948.047 474.733,948.047 474.343,947.657 C473.952,947.267 473.952,946.633 474.343,946.242 L481.242,939.343 C481.451,939.135 481.728,939.046 482,939.06 C482.272,939.046 482.549,939.135 482.757,939.343 L489.657,946.242 C490.047,946.633 490.047,947.267 489.657,947.657 C489.267,948.047 488.633,948.047 488.242,947.657 L483,942.414 L483,957 L490,957 C491.104,957 492,956.104 492,955 L492,939 C492,937.896 491.104,937 490,937 L490,937 Z" id="arrow-up" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 77,
    name: "attachment (1)",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="-8 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>attachment</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-212.000000, -151.000000)" fill="#000000">
            <path d="M226,155 L226,175 C226,178.313 223.313,181 220,181 C216.687,181 214,178.313 214,175 L214,157 C214,154.791 215.791,153 218,153 C220.209,153 222,154.791 222,157 L222,175 C222,176.104 221.104,177 220,177 C218.896,177 218,176.104 218,175 L218,159 L216,159 L216,175 C216,177.209 217.791,179 220,179 C222.209,179 224,177.209 224,175 L224,157 C224,153.687 221.313,151 218,151 C214.687,151 212,153.687 212,157 L212,176 C212.493,179.945 215.921,183 220,183 C224.079,183 227.507,179.945 228,176 L228,155 L226,155" id="attachment" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 78,
    name: "attachment-2 (1)",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>attachment-2</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-258.000000, -154.000000)" fill="#000000">
            <path d="M284.562,164.181 L270.325,178.26 C267.966,180.593 264.141,180.593 261.782,178.26 C259.423,175.928 259.423,172.146 261.782,169.813 L274.596,157.141 C276.168,155.586 278.718,155.586 280.291,157.141 C281.863,158.696 281.863,161.218 280.291,162.772 L267.477,175.444 C266.691,176.222 265.416,176.222 264.629,175.444 C263.843,174.667 263.843,173.406 264.629,172.628 L276.02,161.365 L274.596,159.957 L263.206,171.221 C261.633,172.775 261.633,175.297 263.206,176.853 C264.778,178.407 267.328,178.407 268.901,176.852 L281.714,164.181 C284.073,161.849 284.074,158.065 281.715,155.733 C279.355,153.4 275.531,153.4 273.172,155.733 L259.646,169.108 L259.696,169.157 C257.238,172.281 257.455,176.797 260.358,179.668 C263.262,182.539 267.828,182.754 270.987,180.323 L271.036,180.372 L285.986,165.589 L284.562,164.181" id="attachment-2" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 79,
    name: "attachment-2",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>attachment 2</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-260.000000, -156.000000)" fill="#000000">
            <path d="M286.562,166.181 L272.325,180.26 C269.966,182.593 266.141,182.593 263.782,180.26 C261.423,177.928 261.423,174.146 263.782,171.813 L276.596,159.141 C278.168,157.586 280.718,157.586 282.291,159.141 C283.863,160.696 283.863,163.218 282.291,164.772 L269.477,177.444 C268.691,178.222 267.416,178.222 266.629,177.444 C265.843,176.667 265.843,175.406 266.629,174.628 L278.02,163.365 L276.596,161.957 L265.206,173.221 C263.633,174.775 263.633,177.297 265.206,178.853 C266.778,180.407 269.328,180.407 270.901,178.852 L283.714,166.181 C286.073,163.849 286.074,160.065 283.715,157.733 C281.355,155.4 277.531,155.4 275.172,157.733 L261.646,171.108 L261.696,171.157 C259.238,174.281 259.455,178.797 262.358,181.668 C265.262,184.539 269.828,184.754 272.987,182.323 L273.036,182.372 L287.986,167.589 L286.562,166.181" id="attachment-2" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 80,
    name: "attachment",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="-8 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>attachment</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-214.000000, -153.000000)" fill="#000000">
            <path d="M228,157 L228,177 C228,180.313 225.313,183 222,183 C218.687,183 216,180.313 216,177 L216,159 C216,156.791 217.791,155 220,155 C222.209,155 224,156.791 224,159 L224,177 C224,178.104 223.104,179 222,179 C220.896,179 220,178.104 220,177 L220,161 L218,161 L218,177 C218,179.209 219.791,181 222,181 C224.209,181 226,179.209 226,177 L226,159 C226,155.687 223.313,153 220,153 C216.687,153 214,155.687 214,159 L214,178 C214.493,181.945 217.921,185 222,185 C226.079,185 229.507,181.945 230,178 L230,157 L228,157" id="attachment" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 81,
    name: "award (1)",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 -1 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>award</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-258.000000, -414.000000)" fill="#000000">
            <path d="M283.98,426 L283.98,420 C287.932,420 287.973,419.791 287.973,422 C287.973,424.209 286.186,426 283.98,426 L283.98,426 Z M264.02,426 C261.815,426 260.027,424.209 260.027,422 C260.027,419.791 260.068,420 264.02,420 L264.02,426 L264.02,426 Z M283.98,418 C283.98,415.791 282.193,414 279.988,414 L268.012,414 C265.807,414 264.02,415.791 264.02,418 C257.183,418 258.031,417.999 258.031,422 C258.031,425.313 260.712,428 264.02,428 C264.258,428 264.486,427.962 264.716,427.93 C266.056,431.854 269.213,435.389 273.002,435.928 L273.002,442 L270.008,442 C269.457,442 269.01,442.447 269.01,443 C269.01,443.553 269.457,444 270.008,444 L277.992,444 C278.543,444 278.99,443.553 278.99,443 C278.99,442.447 278.543,442 277.992,442 L274.998,442 L274.998,435.928 C278.787,435.389 281.944,431.854 283.285,427.93 C283.514,427.962 283.742,428 283.98,428 C287.288,428 289.969,425.313 289.969,422 C289.969,417.999 290.817,418 283.98,418 L283.98,418 Z" id="award" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 82,
    name: "award-2 (1)",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>award 2</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-310.000000, -413.000000)" fill="#000000">
            <path d="M334.585,438.51 C333.141,439.913 331.604,441.37 331.604,441.37 L328.954,436.846 C331.729,436.17 334.128,434.568 335.801,432.388 L338.699,437.334 C338.699,437.334 336.633,437.928 334.585,438.51 L334.585,438.51 Z M326,432 C322.134,432 319,428.866 319,425 C319,421.134 322.134,418 326,418 C329.866,418 333,421.134 333,425 C333,428.866 329.866,432 326,432 L326,432 Z M320.396,441.37 C320.396,441.37 318.859,439.913 317.415,438.51 C315.367,437.928 313.301,437.334 313.301,437.334 L316.199,432.388 C317.872,434.568 320.271,436.17 323.046,436.846 L320.396,441.37 L320.396,441.37 Z M337.021,430.436 C337.824,428.825 338.288,427.021 338.288,425.106 C338.288,418.42 332.786,413 326,413 C319.214,413 313.712,418.42 313.712,425.106 C313.712,427.021 314.176,428.825 314.979,430.436 L309.991,438.946 C309.991,438.946 313.154,439.581 316.363,440.241 C318.503,442.623 320.633,445 320.633,445 L325.219,437.174 C325.479,437.19 325.736,437.213 326,437.213 C326.264,437.213 326.521,437.19 326.781,437.174 L331.367,445 C331.367,445 333.497,442.623 335.637,440.241 C338.846,439.581 342.009,438.946 342.009,438.946 L337.021,430.436 L337.021,430.436 Z M326,420 C323.238,420 321,422.238 321,425 C321,427.762 323.238,430 326,430 C328.762,430 331,427.762 331,425 C331,422.238 328.762,420 326,420 L326,420 Z" id="award-2" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 83,
    name: "award-2",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>award-2</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-308.000000, -411.000000)" fill="#000000">
            <path d="M332.585,436.51 C331.141,437.913 329.604,439.37 329.604,439.37 L326.954,434.846 C329.729,434.17 332.128,432.568 333.801,430.388 L336.699,435.334 C336.699,435.334 334.633,435.928 332.585,436.51 L332.585,436.51 Z M324,433.008 C318.482,433.008 314.01,428.525 314.01,422.997 C314.01,417.469 318.482,412.986 324,412.986 C329.518,412.986 333.99,417.469 333.99,422.997 C333.99,428.525 329.518,433.008 324,433.008 L324,433.008 Z M318.396,439.37 C318.396,439.37 316.859,437.913 315.415,436.51 C313.367,435.928 311.301,435.334 311.301,435.334 L314.199,430.388 C315.872,432.568 318.271,434.17 321.046,434.846 L318.396,439.37 L318.396,439.37 Z M335.021,428.436 C335.824,426.825 336.288,425.021 336.288,423.106 C336.288,416.42 330.786,411 324,411 C317.214,411 311.712,416.42 311.712,423.106 C311.712,425.021 312.176,426.825 312.979,428.436 L307.991,436.946 C307.991,436.946 311.154,437.581 314.363,438.241 C316.503,440.623 318.633,443 318.633,443 L323.219,435.174 C323.479,435.19 323.736,435.213 324,435.213 C324.264,435.213 324.521,435.19 324.781,435.174 L329.367,443 C329.367,443 331.497,440.623 333.637,438.241 C336.846,437.581 340.009,436.946 340.009,436.946 L335.021,428.436 L335.021,428.436 Z M324,428 C321.238,428 319,425.762 319,423 C319,420.238 321.238,418 324,418 C326.762,418 329,420.238 329,423 C329,425.762 326.762,428 324,428 L324,428 Z M324,416 C320.134,416 317,419.134 317,423 C317,426.866 320.134,430 324,430 C327.866,430 331,426.866 331,423 C331,419.134 327.866,416 324,416 L324,416 Z" id="award-2" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 84,
    name: "award",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 -1 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>award</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-256.000000, -412.000000)" fill="#000000">
            <path d="M281.98,424 L281.98,418 C285.932,418 285.973,417.791 285.973,420 C285.973,422.209 284.186,424 281.98,424 L281.98,424 Z M279.984,422 C279.984,426.418 276.41,432 272,432 C267.59,432 264.016,426.418 264.016,422 L264.016,416 C264.016,415.011 265.055,414 266.012,414 L277.988,414 C278.945,414 279.984,414.979 279.984,416 L279.984,422 L279.984,422 Z M262.02,424 C259.815,424 258.027,422.209 258.027,420 C258.027,417.791 258.068,418 262.02,418 L262.02,424 L262.02,424 Z M281.98,416 C281.98,413.791 280.193,412 277.988,412 L266.012,412 C263.807,412 262.02,413.791 262.02,416 C255.183,416 256.031,415.999 256.031,420 C256.031,423.313 258.712,426 262.02,426 C262.258,426 262.486,425.962 262.716,425.93 C264.056,429.854 267.213,433.389 271.002,433.928 L271.002,440 L268.008,440 C267.457,440 267.01,440.447 267.01,441 C267.01,441.553 267.457,442 268.008,442 L275.992,442 C276.543,442 276.99,441.553 276.99,441 C276.99,440.447 276.543,440 275.992,440 L272.998,440 L272.998,433.928 C276.787,433.389 279.944,429.854 281.285,425.93 C281.514,425.962 281.742,426 281.98,426 C285.288,426 287.969,423.313 287.969,420 C287.969,415.999 288.817,416 281.98,416 L281.98,416 Z" id="award" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 85,
    name: "backspace (1)",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 -5 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>backspace</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-570.000000, -1146.000000)" fill="#000000">
            <path d="M598,1146 L580.072,1146 C579.792,1145.98 579.508,1146.07 579.293,1146.28 L570.316,1156.22 C570.104,1156.43 570.015,1156.71 570.029,1156.98 C570.015,1157.26 570.104,1157.54 570.316,1157.75 L579.293,1167.69 C579.488,1167.88 579.744,1167.98 580,1167.98 L580,1168 L598,1168 C600.209,1168 602,1166.21 602,1164 L602,1150 C602,1147.79 600.209,1146 598,1146" id="backspace" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 86,
    name: "backspace",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 -5 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>backspace</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-568.000000, -1144.000000)" fill="#000000">
            <path d="M598,1162 C598,1163.1 597.104,1164 596,1164 L578.487,1164 L570.346,1154.98 L578.459,1146 L596,1146 C597.104,1146 598,1146.9 598,1148 L598,1162 L598,1162 Z M596,1144 L578.072,1144 C577.792,1143.98 577.508,1144.07 577.293,1144.28 L568.316,1154.22 C568.104,1154.43 568.015,1154.71 568.029,1154.98 C568.015,1155.26 568.104,1155.54 568.316,1155.75 L577.293,1165.69 C577.488,1165.88 577.744,1165.98 578,1165.98 L578,1166 L596,1166 C598.209,1166 600,1164.21 600,1162 L600,1148 C600,1145.79 598.209,1144 596,1144 L596,1144 Z" id="backspace" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 87,
    name: "bag (1)",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="-4 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>bag</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-574.000000, -725.000000)" fill="#000000">
            <path d="M594,729 L592,729 L592,737 L590,737 L590,729 L582,729 L582,737 L580,737 L580,729 L578,729 C575.791,729 574,730.791 574,733 L574,749 L598,749 L598,733 C598,730.791 596.209,729 594,729 L594,729 Z M586,727 C588.209,727 590,727.619 590,729 L592,729 C592,726.791 589.313,725 586,725 C582.687,725 580,726.791 580,729 L582,729 C582,727.619 583.791,727 586,727 L586,727 Z M574,753 C574,755.209 575.791,757 578,757 L594,757 C596.209,757 598,755.209 598,753 L598,751 L574,751 L574,753 L574,753 Z" id="bag" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 88,
    name: "bag",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="-4 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>bag</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-572.000000, -723.000000)" fill="#000000">
            <path d="M594,747 L574,747 L574,731 C574,729.896 574.896,729 576,729 L578,729 L578,735 L580,735 L580,729 L588,729 L588,735 L590,735 L590,729 L592,729 C593.104,729 594,729.896 594,731 L594,747 L594,747 Z M594,751 C594,752.104 593.104,753 592,753 L576,753 C574.896,753 574,752.104 574,751 L574,749 L594,749 L594,751 L594,751 Z M584,725 C586.209,725 588,725.619 588,727 L580,727 C580,725.619 581.791,725 584,725 L584,725 Z M592,727 L590,727 C590,724.791 587.313,723 584,723 C580.687,723 578,724.791 578,727 L576,727 C573.791,727 572,728.791 572,731 L572,751 C572,753.209 573.791,755 576,755 L592,755 C594.209,755 596,753.209 596,751 L596,731 C596,728.791 594.209,727 592,727 L592,727 Z" id="bag" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 89,
    name: "basked",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 -3 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>basked</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-414.000000, -728.000000)" fill="#000000">
            <path d="M445,734 L438.474,734 L440.5,730 L443,730 C443.553,730 444,729.553 444,729 C444,728.447 443.553,728 443,728 L439,728 L435.916,734 L424.168,734 L421,728 L417,728 C416.447,728 416,728.447 416,729 C416,729.553 416.447,730 417,730 L419.5,730 L421.646,734 L415,734 C414.447,734 414,734.448 414,735 C414,735.553 414.447,736 415,736 L416,736 L416.286,740 L424,740 L424,736 L426,736 L426,740 L434,740 L434,736 L436,736 L436,740 L443.429,740 L444,736 L445,736 C445.553,736 446,735.553 446,735 C446,734.448 445.553,734 445,734 L445,734 Z M436,746 L442.571,746 L443.143,742 L436,742 L436,746 L436,746 Z M426,746 L434,746 L434,742 L426,742 L426,746 Z M424,742 L416.429,742 L416.714,746 L424,746 L424,742 L424,742 Z M436,752 L434,752 L434,748 L426,748 L426,752 L424,752 L424,748 L416.857,748 L417,750 C417,752.209 418.791,754 421,754 L438,754 C440.209,754 442,752.209 442,750 L442.286,748 L436,748 L436,752 L436,752 Z" id="basked" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 90,
    name: "basket",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 -3 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>basket</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-412.000000, -726.000000)" fill="#000000">
            <path d="M439.429,738 L434,738 L434,734 L440,734 L439.429,738 L439.429,738 Z M438.571,744 L434,744 L434,740 L439.143,740 L438.571,744 L438.571,744 Z M438,748 C438,749.104 437.104,750 436,750 L434,750 L434,746 L438.286,746 L438,748 L438,748 Z M424,734 L432,734 L432,738 L424,738 L424,734 Z M424,740 L432,740 L432,744 L424,744 L424,740 Z M424,746 L432,746 L432,750 L424,750 L424,746 Z M422,738 L416.286,738 L416,734 L422,734 L422,738 L422,738 Z M422,744 L416.714,744 L416.429,740 L422,740 L422,744 L422,744 Z M422,750 L419,750 C417.896,750 417,749.104 417,748 L416.857,746 L422,746 L422,750 L422,750 Z M443,732 L436.474,732 L438.5,728 L441,728 C441.553,728 442,727.553 442,727 C442,726.447 441.553,726 441,726 L437,726 L433.916,732 L422.168,732 L419,726 L415,726 C414.447,726 414,726.447 414,727 C414,727.553 414.447,728 415,728 L417.5,728 L419.646,732 L413,732 C412.447,732 412,732.448 412,733 C412,733.553 412.447,734 413,734 L414,734 L415,748 C415,750.209 416.791,752 419,752 L436,752 C438.209,752 440,750.209 440,748 L442,734 L443,734 C443.553,734 444,733.553 444,733 C444,732.448 443.553,732 443,732 L443,732 Z" id="basket" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 91,
    name: "book-album",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>book-album</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-412.000000, -99.000000)" fill="#000000">
            <path d="M442,124 C442,125.104 441.073,125.656 440,126 C440,126 434.557,127.515 429,128.977 L429,104 L440,101 C441.104,101 442,101.896 442,103 L442,124 L442,124 Z M427,128.998 C421.538,127.53 416,126 416,126 C414.864,125.688 414,125.104 414,124 L414,103 C414,101.896 414.896,101 416,101 L427,104 L427,128.998 L427,128.998 Z M440,99 C440,99 434.211,100.594 428.95,102 C428.291,102.025 427.627,102 426.967,102 C421.955,100.656 416,99 416,99 C413.791,99 412,100.791 412,103 L412,124 C412,126.209 413.885,127.313 416,128 C416,128 421.393,129.5 426.967,131 L428.992,131 C434.612,129.5 440,128 440,128 C442.053,127.469 444,126.209 444,124 L444,103 C444,100.791 442.209,99 440,99 L440,99 Z" id="book-album" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 92,
    name: "briefcase",
    category: "",
    svg: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 -1 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>briefcase</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-204.000000, -204.000000)" fill="#000000">
            <path d="M234,217 L206,217 L206,212 C206,210.896 206.896,210 208,210 L232,210 C233.104,210 234,210.896 234,212 L234,217 L234,217 Z M218,220 C218,219.634 218.105,219.296 218.277,219 L221.723,219 C221.895,219.296 222,219.634 222,220 C222,221.104 221.104,222 220,222 C218.896,222 218,221.104 218,220 L218,220 Z M234,230 C234,231.104 233.104,232 232,232 L208,232 C206.896,232 206,231.104 206,230 L206,219 L216.142,219 C216.058,219.321 216,219.652 216,220 C216,222.209 217.791,224 220,224 C222.209,224 224,222.209 224,220 C224,219.652 223.942,219.321 223.858,219 L234,219 L234,230 L234,230 Z M216,207 C216,206.448 216.448,206 217,206 L223,206 C223.552,206 224,206.448 224,207 L224,208 L216,208 L216,207 L216,207 Z M232,208 L226,208 L226,206 C226,204.896 225.104,204 224,204 L216,204 C214.896,204 214,204.896 214,206 L214,208 L208,208 C205.791,208 204,209.791 204,212 L204,230 C204,232.209 205.791,234 208,234 L232,234 C234.209,234 236,232.209 236,230 L236,212 C236,209.791 234.209,208 232,208 L232,208 Z" id="briefcase" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`,
    tags: [],
  },
{
    id: 93,
    name: "a",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.42436 0H9.57565L14.995 16H11.8276L10.8115 13H5.18855L4.17242 16H1.005L6.42436 0ZM6.20468 10H9.79533L8 4.69952L6.20468 10Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 94,
    name: "accessibility",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM9.25 3.75C9.25 4.44036 8.69036 5 8 5C7.30964 5 6.75 4.44036 6.75 3.75C6.75 3.05964 7.30964 2.5 8 2.5C8.69036 2.5 9.25 3.05964 9.25 3.75ZM12 8H9.41901L11.2047 13H9.081L8 9.97321L6.91901 13H4.79528L6.581 8H4V6H12V8Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 95,
    name: "activity",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 1H1V7H3.38197L4.88196 4L7.11803 4L10 9.76393L11.382 7H15V1Z" fill="#000000"/>
<path d="M15 9H12.618L11.118 12L8.88197 12L6 6.23607L4.61803 9H1V15H15V9Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 96,
    name: "address-card",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16 2H0V14H16V2ZM5 10.5C6.38071 10.5 7.5 9.38071 7.5 8C7.5 6.61929 6.38071 5.5 5 5.5C3.61929 5.5 2.5 6.61929 2.5 8C2.5 9.38071 3.61929 10.5 5 10.5ZM10 5H14V7H10V5ZM14 9H10V11H14V9Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 97,
    name: "alarm-clock",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.95706 1.45712L1.45706 3.95712L0.0428467 2.54291L2.54285 0.0429077L3.95706 1.45712Z" fill="#000000"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.4999 8.50003C14.4999 9.80523 14.1152 11.0206 13.453 12.0389L15.707 14.2929L14.2928 15.7071L12.1163 13.5307C10.9954 14.449 9.56199 15 7.99986 15C6.43776 15 5.00436 14.449 3.88344 13.5307L1.70701 15.7071L0.2928 14.2929L2.54678 12.0389C1.88457 11.0206 1.49986 9.80525 1.49986 8.50003C1.49986 4.91018 4.41001 2.00003 7.99986 2.00003C11.5897 2.00003 14.4999 4.91018 14.4999 8.50003ZM6.99995 5V9.41421L9.29285 11.7071L10.7071 10.2929L8.99995 8.58579V5H6.99995Z" fill="#000000"/>
<path d="M14.5428 3.95714L12.0428 1.45714L13.457 0.0429222L15.957 2.54292L14.5428 3.95714Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 98,
    name: "alien",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 16L3.54223 12.3383C1.93278 11.0162 1 9.04287 1 6.96005C1 3.11612 4.15607 0 8 0C11.8439 0 15 3.11612 15 6.96005C15 9.04287 14.0672 11.0162 12.4578 12.3383L8 16ZM3 6H5C6.10457 6 7 6.89543 7 8V9L3 7.5V6ZM11 6C9.89543 6 9 6.89543 9 8V9L13 7.5V6H11Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 99,
    name: "align-bottom",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 11V1H9L9 11H13Z" fill="#000000"/>
<path d="M15 15V13L1 13V15L15 15Z" fill="#000000"/>
<path d="M7 5L7 11H3L3 5H7Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 100,
    name: "align-center-horizontal",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 7H13V1H9L9 15H13V9H16V7Z" fill="#000000"/>
<path d="M7 12H3V9H0V7H3V4L7 4L7 12Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 101,
    name: "align-center-vertical",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 0H7V3H4V7H12V3H9V0Z" fill="#000000"/>
<path d="M1 13V9H15V13H9V16H7V13H1Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 102,
    name: "align-left",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 1H3V15H1V1Z" fill="#000000"/>
<path d="M5 13H15V9H5V13Z" fill="#000000"/>
<path d="M11 7H5V3H11V7Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 103,
    name: "align-right",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 1H13V15H15V1Z" fill="#000000"/>
<path d="M11 13H1V9H11V13Z" fill="#000000"/>
<path d="M5 7H11V3H5V7Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 104,
    name: "align-text-center",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 1H3V3H13V1Z" fill="#000000"/>
<path d="M1 5H15V7H1V5Z" fill="#000000"/>
<path d="M13 9H3V11H13V9Z" fill="#000000"/>
<path d="M15 13H1V15H15V13Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 105,
    name: "align-text-justify",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 1H1V3H15V1Z" fill="#000000"/>
<path d="M1 5H15V7H1V5Z" fill="#000000"/>
<path d="M15 9H1V11H15V9Z" fill="#000000"/>
<path d="M11 13H1V15H11V13Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 106,
    name: "align-text-left",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 1H1V3H11V1Z" fill="#000000"/>
<path d="M1 5H15V7H1V5Z" fill="#000000"/>
<path d="M11 9H1V11H11V9Z" fill="#000000"/>
<path d="M15 13H1V15H15V13Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 107,
    name: "align-text-right",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 1H5V3H15V1Z" fill="#000000"/>
<path d="M1 5H15V7H1V5Z" fill="#000000"/>
<path d="M15 9H5V11H15V9Z" fill="#000000"/>
<path d="M15 13H1V15H15V13Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 108,
    name: "align-top",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 1V3L1 3V1H15Z" fill="#000000"/>
<path d="M13 5V15H9L9 5H13Z" fill="#000000"/>
<path d="M7 11L7 5H3L3 11H7Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 109,
    name: "anchor",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 3C11 4.30622 10.1652 5.41746 9 5.82929V13.917C11.5125 13.4955 13.4955 11.5125 13.917 9H12V7H16V8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8V7H4V9H2.08296C2.50448 11.5125 4.48749 13.4955 7 13.917V5.82929C5.83481 5.41746 5 4.30622 5 3C5 1.34315 6.34315 0 8 0C9.65685 0 11 1.34315 11 3Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 110,
    name: "angle-down",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.00003 8.1716L3.41424 3.58582L0.585815 6.41424L8.00003 13.8285L15.4142 6.41424L12.5858 3.58582L8.00003 8.1716Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 111,
    name: "angle-left",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.82842 8.00003L12.4142 3.41424L9.58578 0.585815L2.17157 8.00003L9.58578 15.4142L12.4142 12.5858L7.82842 8.00003Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 112,
    name: "angle-right",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.1716 8.00003L3.58582 3.41424L6.41424 0.585815L13.8285 8.00003L6.41424 15.4142L3.58582 12.5858L8.1716 8.00003Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 113,
    name: "angle-up",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.00003 7.82842L12.5858 12.4142L15.4142 9.58578L8.00003 2.17157L0.585815 9.58578L3.41424 12.4142L8.00003 7.82842Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 114,
    name: "angles-down",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.70709 7.29288L7.99998 12.5858L13.2929 7.29288L14.7071 8.70709L7.99998 15.4142L1.29288 8.70709L2.70709 7.29288Z" fill="#000000"/>
<path d="M2.70709 0.792877L7.99998 6.08577L13.2929 0.792878L14.7071 2.20709L7.99998 8.9142L1.29288 2.20709L2.70709 0.792877Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 115,
    name: "angles-left",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.70714 13.2929L3.41424 8.00001L8.70714 2.70712L7.29292 1.29291L0.585815 8.00001L7.29292 14.7071L8.70714 13.2929Z" fill="#000000"/>
<path d="M15.2071 13.2929L9.91424 8.00001L15.2071 2.70712L13.7929 1.29291L7.08582 8.00001L13.7929 14.7071L15.2071 13.2929Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 116,
    name: "angles-right",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.29286 13.2929L12.5858 8.00001L7.29286 2.70712L8.70708 1.29291L15.4142 8.00001L8.70707 14.7071L7.29286 13.2929Z" fill="#000000"/>
<path d="M0.792862 13.2929L6.08576 8.00001L0.792862 2.70712L2.20708 1.29291L8.91418 8.00001L2.20707 14.7071L0.792862 13.2929Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 117,
    name: "angles-up",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.2929 8.70711L8 3.41421L2.70711 8.7071L1.29289 7.29289L8 0.585785L14.7071 7.29289L13.2929 8.70711Z" fill="#000000"/>
<path d="M13.2929 15.2071L8 9.91421L2.70711 15.2071L1.29289 13.7929L8 7.08578L14.7071 13.7929L13.2929 15.2071Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 118,
    name: "aperture",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.6906 6.00001L3.16512 1.62576C4.50811 0.605527 6.18334 0 8 0C8.37684 0 8.74759 0.0260554 9.11056 0.076463L5.6906 6.00001Z" fill="#000000"/>
<path d="M5.11325 9L1.69363 3.07705C0.632438 4.43453 0 6.14341 0 8C0 8.33866 0.0210434 8.67241 0.0618939 9H5.11325Z" fill="#000000"/>
<path d="M4.89635 15.3757C2.93947 14.5512 1.37925 12.9707 0.581517 11H7.42265L4.89635 15.3757Z" fill="#000000"/>
<path d="M8 16C7.62316 16 7.25241 15.9739 6.88944 15.9235L10.3094 10L12.8349 14.3742C11.4919 15.3945 9.81666 16 8 16Z" fill="#000000"/>
<path d="M16 8C16 9.85659 15.3676 11.5655 14.3064 12.9229L10.8868 7H15.9381C15.979 7.32759 16 7.66134 16 8Z" fill="#000000"/>
<path d="M11.1036 0.624326C13.0605 1.44877 14.6208 3.02927 15.4185 5H8.57735L11.1036 0.624326Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 119,
    name: "aquarius",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.50005 1.34827L8.00005 3.34827L11.5 1.34827L15.4962 3.63177L14.5039 5.36826L11.5 3.65177L8.00005 5.65177L4.50005 3.65177L1.49618 5.36826L0.503906 3.63177L4.50005 1.34827Z" fill="#000000"/>
<path d="M4.50005 10.3483L8.00005 12.3483L11.5 10.3483L15.4962 12.6318L14.5039 14.3683L11.5 12.6518L8.00005 14.6518L4.50005 12.6518L1.49618 14.3683L0.503906 12.6318L4.50005 10.3483Z" fill="#000000"/>
<path d="M4.50005 5.84827L0.503906 8.13177L1.49618 9.86826L4.50005 8.15177L8.00005 10.1518L11.5 8.15177L14.5039 9.86826L15.4962 8.13177L11.5 5.84827L8.00005 7.84827L4.50005 5.84827Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 120,
    name: "archive-box",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 2H0V5H16V2Z" fill="#000000"/>
<path d="M1 7H5V9H11V7H15V15H1V7Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 121,
    name: "aries",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 4.19056C0 2.42846 1.42846 1 3.19056 1C4.72033 1 6.03482 2.08579 6.32371 3.58803L8 12.3047L9.67629 3.58803C9.96518 2.08579 11.2797 1 12.8094 1C14.5715 1 16 2.42846 16 4.19056V6H14V4.19056C14 3.53303 13.467 3 12.8094 3C12.2386 3 11.7481 3.40516 11.6403 3.96573L9.32602 16H6.67398L4.3597 3.96573C4.2519 3.40516 3.7614 3 3.19056 3C2.53303 3 2 3.53303 2 4.19056V6H0V4.19056Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 122,
    name: "arrow-down-from-line",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 10L6 10L6 4L10 4L10 10L13 10V11L8 16L3 11L3 10Z" fill="#000000"/>
<path d="M2 0L14 1.90735e-06V2L2 2V0Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 123,
    name: "arrow-down-left",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.16421 9.66421L15.4142 3.41421L12.5858 0.585785L6.33579 6.83578L3.5 4L2 5.5V14H10.5L12 12.5L9.16421 9.66421Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 124,
    name: "arrow-down-right",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.66411 6.8359L3.414 0.585785L0.585571 3.41421L6.83568 9.66432L4.00002 12.5L5.50002 14H14V5.49999L12.5 3.99999L9.66411 6.8359Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 125,
    name: "arrow-down-short-wide",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 11H3L3 0H5L5 11H8V12L4 16L0 12V11Z" fill="#000000"/>
<path d="M16 10H10V8H16V10Z" fill="#000000"/>
<path d="M10 6H14V4H10V6Z" fill="#000000"/>
<path d="M12 2H10V0H12V2Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 126,
    name: "arrow-down-to-bracket",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 16H1L1 9H3L3 14H13V9H15L15 16Z" fill="#000000"/>
<path d="M12 6L9 6L9 1.74846e-07L7 0V6L4 6L4 7L8 11L12 7L12 6Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 127,
    name: "arrow-down-to-line",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 7H10V0H6V7L3 7V8L8 13L13 8V7Z" fill="#000000"/>
<path d="M14 14H2V16H14V14Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 128,
    name: "arrow-down-wide-short",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 11H3L3 0H5L5 11H8V12L4 16L0 12V11Z" fill="#000000"/>
<path d="M16 0H10V2H16V0Z" fill="#000000"/>
<path d="M10 4H14V6H10V4Z" fill="#000000"/>
<path d="M12 8H10V10H12V8Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 129,
    name: "arrow-down",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 8L14 8V10L8 16L2 10V8H6V0L10 4.76995e-08V8Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 130,
    name: "arrow-left-arrow-right",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 16V13L16 13V11L5 11L5 8H4L3.93403e-07 12L4 16H5Z" fill="#000000"/>
<path d="M11 8L11 5L8.74227e-08 5L0 3L11 3V4.37112e-08L12 0L16 4L12 8H11Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 131,
    name: "arrow-left-from-line",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 3L6 6H12L12 10H6L6 13L5 13L0 8L5 3L6 3Z" fill="#000000"/>
<path d="M16 2L16 14H14L14 2L16 2Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 132,
    name: "arrow-left-to-line",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 13L9 10H16V6L9 6L9 3L8 3L3 8L8 13H9Z" fill="#000000"/>
<path d="M2 14L2 2L0 2L5.24537e-07 14H2Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 133,
    name: "arrow-left",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 10L8 14L6 14L-2.62268e-07 8L6 2L8 2L8 6L16 6L16 10L8 10Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 134,
    name: "arrow-right-from-bracket",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 4V7L5 7V9H11V12H12L16 8L12 4L11 4Z" fill="#000000"/>
<path d="M0 1L3.41715e-07 15H8V13H2L2 3H8L8 1L0 1Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 135,
    name: "arrow-right-from-line",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 3V6H4L4 10H10L10 13L11 13L16 8L11 3L10 3Z" fill="#000000"/>
<path d="M0 2L1.38281e-06 14H2L2 2L0 2Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 136,
    name: "arrow-right-to-bracket",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 1V15H9V13H14V3H9V1L16 1Z" fill="#000000"/>
<path d="M6 4V7L8.74229e-08 7L0 9H6V12H7L11 8L7 4H6Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 137,
    name: "arrow-right-to-line",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 13V10H0L1.74846e-07 6L7 6L7 3L8 3L13 8L8 13H7Z" fill="#000000"/>
<path d="M14 14V2L16 2V14H14Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 138,
    name: "arrow-right",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 6L8 2L10 2L16 8L10 14L8 14L8 10L-1.74845e-07 10L-3.01991e-07 6L8 6Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 139,
    name: "arrow-rotate-left",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 7L7 6L4.70711 3.70711L5.19868 3.21553C5.97697 2.43724 7.03256 2 8.13323 2C11.361 2 14 4.68015 14 7.93274C14 11.2589 11.3013 14 8 14C6.46292 14 4.92913 13.4144 3.75736 12.2426L2.34315 13.6569C3.90505 15.2188 5.95417 16 8 16C12.4307 16 16 12.3385 16 7.93274C16 3.60052 12.4903 0 8.13323 0C6.50213 0 4.93783 0.647954 3.78447 1.80132L3.29289 2.29289L1 0L0 1V7H6Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 140,
    name: "arrow-rotate-right",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 7L9 6L11.2929 3.70711L10.8013 3.21553C10.023 2.43724 8.96744 2 7.86677 2C4.63903 2 2 4.68015 2 7.93274C2 11.2589 4.69868 14 8 14C9.53708 14 11.0709 13.4144 12.2426 12.2426L13.6569 13.6569C12.095 15.2188 10.0458 16 8 16C3.56933 16 0 12.3385 0 7.93274C0 3.60052 3.50968 0 7.86677 0C9.49787 0 11.0622 0.647954 12.2155 1.80132L12.7071 2.29289L15 0L16 1V7H10Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 141,
    name: "arrows-left-right",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 9L6 13L5 13L-3.15903e-06 8L5 3L6 3L6 7L10 7L10 3L11 3L16 8L11 13L10 13L10 9L6 9Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 142,
    name: "arrows-up-down",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 10H13V11L8 16L3 11L3 10H7L6.99999 6L3 6L3 5L8 0L13 5V6L9 6L9 10Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 143,
    name: "c-sharp",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="nonzero" clip-rule="nonzero" d="M7.00017 5.5C5.61936 5.5 4.5 6.61936 4.5 8.00017C4.5 9.38097 5.61936 10.5003 7.00017 10.5003C7.71226 10.5003 8.3538 10.2036 8.81009 9.725C9.09591 9.4252 9.57065 9.41386 9.87045 9.69968C10.1703 9.9855 10.1816 10.4602 9.89577 10.76C9.16817 11.5232 8.13926 12.0003 7.00017 12.0003C4.79094 12.0003 3 10.2094 3 8.00017C3 5.79094 4.79094 4 7.00017 4C8.13445 4 9.15952 4.47309 9.88658 5.23069C10.1734 5.52954 10.1636 6.00432 9.86477 6.29112C9.56591 6.57793 9.09114 6.56817 8.80433 6.26931C8.3484 5.79424 7.70928 5.5 7.00017 5.5Z" fill="#000000"/>
<path fill-rule="nonzero" clip-rule="nonzero" d="M6.58638 0.102166C6.8199 -0.0340553 7.10867 -0.0340553 7.34219 0.102166L12.0565 2.85217C12.4143 3.06088 12.5351 3.52011 12.3264 3.8779C12.1177 4.23569 11.6585 4.35654 11.3007 4.14783L6.96429 1.61828L1.5 4.80578V11.1942L6.96429 14.3817L11.3007 11.8522C11.6585 11.6435 12.1177 11.7643 12.3264 12.1221C12.5351 12.4799 12.4143 12.9391 12.0565 13.1478L7.34219 15.8978C7.10867 16.0341 6.8199 16.0341 6.58638 15.8978L0.372097 12.2728C0.141683 12.1384 0 11.8918 0 11.625V4.375C0 4.10825 0.141683 3.86157 0.372097 3.72717L6.58638 0.102166Z" fill="#000000"/>
<path fill-rule="nonzero" clip-rule="nonzero" d="M12.1799 5.25C12.456 5.25 12.6799 5.47386 12.6799 5.75V10.25C12.6799 10.5261 12.456 10.75 12.1799 10.75C11.9038 10.75 11.6799 10.5261 11.6799 10.25V5.75C11.6799 5.47386 11.9038 5.25 12.1799 5.25Z" fill="#000000"/>
<path fill-rule="nonzero" clip-rule="nonzero" d="M14.3201 5.25C14.5962 5.25 14.8201 5.47386 14.8201 5.75V10.25C14.8201 10.5261 14.5962 10.75 14.3201 10.75C14.044 10.75 13.8201 10.5261 13.8201 10.25V5.75C13.8201 5.47386 14.044 5.25 14.3201 5.25Z" fill="#000000"/>
<path fill-rule="nonzero" clip-rule="nonzero" d="M10.5 6.92993C10.5 6.65379 10.7239 6.42993 11 6.42993H15.5C15.7761 6.42993 16 6.65379 16 6.92993C16 7.20607 15.7761 7.42993 15.5 7.42993H11C10.7239 7.42993 10.5 7.20607 10.5 6.92993Z" fill="#000000"/>
<path fill-rule="nonzero" clip-rule="nonzero" d="M10.5 9.07007C10.5 8.79393 10.7239 8.57007 11 8.57007H15.5C15.7761 8.57007 16 8.79393 16 9.07007C16 9.34621 15.7761 9.57007 15.5 9.57007H11C10.7239 9.57007 10.5 9.34621 10.5 9.07007Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 144,
    name: "css",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="nonzero" clip-rule="nonzero" d="M3 1.60001C2.86193 1.60001 2.75 1.71193 2.75 1.85001V11.4003C2.75 11.4896 2.79769 11.5722 2.87509 11.6168L7.73381 14.4194C7.80942 14.463 7.90231 14.464 7.97886 14.4221L13.1201 11.6048C13.2002 11.5609 13.25 11.4769 13.25 11.3856V1.85001C13.25 1.71193 13.1381 1.60001 13 1.60001H3ZM1.25 1.85001C1.25 0.883508 2.0335 0.100006 3 0.100006H13C13.9665 0.100006 14.75 0.883509 14.75 1.85001V11.3856C14.75 12.0248 14.4015 12.6131 13.841 12.9203L8.69968 15.7375C8.16383 16.0311 7.51363 16.024 6.98434 15.7187L2.12562 12.9162C1.58382 12.6037 1.25 12.0258 1.25 11.4003V1.85001ZM5 4.35001C5 3.93579 5.33579 3.60001 5.75 3.60001H10.3654C10.7796 3.60001 11.1154 3.93579 11.1154 4.35001V10.4462C11.1154 10.7302 10.9549 10.9899 10.7008 11.117L8.3931 12.2708C8.18196 12.3764 7.93343 12.3764 7.72228 12.2708L5.41459 11.117C5.1605 10.9899 5 10.7302 5 10.4462V9.86924C5 9.45502 5.33579 9.11924 5.75 9.11924C6.16421 9.11924 6.5 9.45502 6.5 9.86924V9.98263L8.05769 10.7615L9.61539 9.98263V8.31154H7C6.58579 8.31154 6.25 7.97576 6.25 7.56154C6.25 7.14733 6.58579 6.81154 7 6.81154H9.61539V5.10001H5.75C5.33579 5.10001 5 4.76422 5 4.35001Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 145,
    name: "dart",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="nonzero" clip-rule="nonzero" d="M8.20726 0.129583C8.46706 0.205238 8.66501 0.416426 8.72371 0.680576L9.92292 6.07703L15.3194 7.27624C15.5836 7.33494 15.7948 7.53288 15.8704 7.79269C15.9461 8.05249 15.8742 8.33287 15.6828 8.52421L8.52427 15.6828C8.34503 15.862 8.08665 15.9373 7.8392 15.8823L1.98214 14.5807C1.70114 14.5183 1.48168 14.2988 1.41923 14.0178L0.117674 8.1608C0.0626867 7.91336 0.137929 7.65497 0.317168 7.47573L7.47574 0.317164C7.66708 0.125826 7.94746 0.0539287 8.20726 0.129583ZM8.48951 6.46196L7.56922 2.32064L1.65343 8.23644L2.57372 12.3777L8.48951 6.46196ZM3.62221 13.4262L7.76357 14.3465L13.6794 8.43073L9.538 7.51044L3.62221 13.4262Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 146,
    name: "docker",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="nonzero" clip-rule="nonzero" d="M5.46619 2.00322C5.46619 1.44916 5.91535 1 6.46941 1H9.47907C10.0331 1 10.4823 1.44915 10.4823 2.00322V5.01288C10.4823 5.09948 10.4713 5.18352 10.4507 5.26368C10.4713 5.34385 10.4823 5.42789 10.4823 5.51449V8.02254H11.7363V6.0161C11.7363 5.60055 12.0732 5.26368 12.4887 5.26368C12.9043 5.26368 13.2411 5.60055 13.2411 6.0161V8.02254H15.2476C15.6631 8.02254 16 8.35941 16 8.77495C16 9.1905 15.6631 9.52737 15.2476 9.52737H13.2113C13.0634 11.3518 12.3727 12.8078 11.2779 13.8375C10.045 14.9972 8.37374 15.5467 6.59481 15.5467C4.97058 15.5467 3.43674 15.0891 2.24224 14.1255C1.03896 13.1549 0.236443 11.7155 0.0125343 9.86728C-0.115917 8.80699 0.763545 8.02254 1.70412 8.02254H1.95492V5.51449C1.95492 4.96043 2.40408 4.51127 2.95814 4.51127H5.46619V2.00322ZM5.46619 6.0161H3.45975V8.02254H5.46619V6.0161ZM1.70412 9.52737C1.63196 9.52737 1.57447 9.55683 1.54064 9.59191C1.51066 9.62299 1.50235 9.65252 1.50644 9.68629C1.68777 11.1831 2.31696 12.2524 3.18705 12.9543C4.06593 13.6632 5.24713 14.0419 6.59481 14.0419C8.071 14.0419 9.34667 13.5882 10.2469 12.7414C11.0115 12.0222 11.5598 10.9686 11.7007 9.52737H1.70412ZM6.97102 8.02254H8.97746V6.0161H6.97102V8.02254ZM6.97102 4.51127H8.97746V2.50483H6.97102V4.51127Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 147,
    name: "elixir",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.17742 0C8.60499 0 8.95161 0.346618 8.95161 0.774194C8.95161 1.10989 9.14228 1.59502 9.59357 2.29259C9.91923 2.79597 10.3215 3.32549 10.7653 3.90964C10.9218 4.11569 11.0835 4.32854 11.2489 4.54944C12.4559 6.16224 13.8548 8.18889 13.8548 10.4086C13.8548 12.2293 13.1517 13.6492 12.0576 14.6046C10.9788 15.5468 9.56452 16 8.17742 16C6.79032 16 5.37602 15.5468 4.29721 14.6046C3.20313 13.6492 2.5 12.2293 2.5 10.4086C2.5 8.18889 3.89892 6.16224 5.10598 4.54944C5.27131 4.32854 5.43301 4.11569 5.58955 3.90964C6.03333 3.32549 6.43561 2.79597 6.76127 2.29259C7.21256 1.59502 7.40323 1.10989 7.40323 0.774194C7.40323 0.346618 7.74984 0 8.17742 0ZM8.17742 2.95048C8.13918 3.01215 8.10041 3.07322 8.06131 3.13365C7.70104 3.69053 7.24664 4.28853 6.79165 4.88731C6.64193 5.08434 6.49215 5.28146 6.34563 5.47722C5.10108 7.14012 4.04839 8.77455 4.04839 10.4086C4.04839 11.7994 4.57106 12.7881 5.3157 13.4384C6.07559 14.102 7.11291 14.4516 8.17742 14.4516C9.24193 14.4516 10.2792 14.102 11.0391 13.4384C11.7838 12.7881 12.3065 11.7994 12.3065 10.4086C12.3065 8.77455 11.2538 7.14012 10.0092 5.47722C9.86269 5.28146 9.71291 5.08434 9.56319 4.88731C9.10819 4.28853 8.6538 3.69053 8.29352 3.13365C8.25443 3.07322 8.21566 3.01215 8.17742 2.95048ZM6.1129 9.80645C6.54048 9.80645 6.8871 10.1531 6.8871 10.5806C6.8871 10.845 7.02706 11.1741 7.3055 11.4526C7.58394 11.731 7.91308 11.871 8.17742 11.871C8.60499 11.871 8.95161 12.2176 8.95161 12.6452C8.95161 13.0727 8.60499 13.4194 8.17742 13.4194C7.4095 13.4194 6.70638 13.0432 6.21063 12.5474C5.71488 12.0517 5.33871 11.3486 5.33871 10.5806C5.33871 10.1531 5.68533 9.80645 6.1129 9.80645Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 148,
    name: "elm",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="nonzero" clip-rule="nonzero" d="M2.62865 1.58126L4.72709 3.67969H9.79166L7.69322 1.58126H2.62865ZM9.78803 1.58126L14.4187 6.21198V1.82813C14.4187 1.69179 14.3082 1.58126 14.1719 1.58126H9.78803ZM14.112 8.00001L11.5797 5.46772L9.0474 8.00001L11.5797 10.5323L14.112 8.00001ZM12.6271 11.5797L14.4187 13.3714V9.78803L12.6271 11.5797ZM13.3713 14.4188L8 9.04741L2.62865 14.4188H13.3713ZM1.58125 13.3714L6.9526 8.00001L1.58125 2.62866V13.3714ZM8 6.9526L9.79166 5.16094H6.20834L8 6.9526ZM0.0999985 1.82813C0.0999985 0.873713 0.873707 0.100006 1.82812 0.100006H14.1719C15.1263 0.100006 15.9 0.873714 15.9 1.82813V14.1719C15.9 15.1263 15.1263 15.9 14.1719 15.9H1.82812C0.873706 15.9 0.0999985 15.1263 0.0999985 14.1719V1.82813Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 149,
    name: "error",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.493 0.015 C 7.442 0.021,7.268 0.039,7.107 0.055 C 5.234 0.242,3.347 1.208,2.071 2.634 C 0.660 4.211,-0.057 6.168,0.009 8.253 C 0.124 11.854,2.599 14.903,6.110 15.771 C 8.169 16.280,10.433 15.917,12.227 14.791 C 14.017 13.666,15.270 11.933,15.771 9.887 C 15.943 9.186,15.983 8.829,15.983 8.000 C 15.983 7.171,15.943 6.814,15.771 6.113 C 14.979 2.878,12.315 0.498,9.000 0.064 C 8.716 0.027,7.683 -0.006,7.493 0.015 M8.853 1.563 C 9.967 1.707,11.010 2.136,11.944 2.834 C 12.273 3.080,12.920 3.727,13.166 4.056 C 13.727 4.807,14.142 5.690,14.330 6.535 C 14.544 7.500,14.544 8.500,14.330 9.465 C 13.916 11.326,12.605 12.978,10.867 13.828 C 10.239 14.135,9.591 14.336,8.880 14.444 C 8.456 14.509,7.544 14.509,7.120 14.444 C 5.172 14.148,3.528 13.085,2.493 11.451 C 2.279 11.114,1.999 10.526,1.859 10.119 C 1.618 9.422,1.514 8.781,1.514 8.000 C 1.514 6.961,1.715 6.075,2.160 5.160 C 2.500 4.462,2.846 3.980,3.413 3.413 C 3.980 2.846,4.462 2.500,5.160 2.160 C 6.313 1.599,7.567 1.397,8.853 1.563 M7.706 4.290 C 7.482 4.363,7.355 4.491,7.293 4.705 C 7.257 4.827,7.253 5.106,7.259 6.816 C 7.267 8.786,7.267 8.787,7.325 8.896 C 7.398 9.033,7.538 9.157,7.671 9.204 C 7.803 9.250,8.197 9.250,8.329 9.204 C 8.462 9.157,8.602 9.033,8.675 8.896 C 8.733 8.787,8.733 8.786,8.741 6.816 C 8.749 4.664,8.749 4.662,8.596 4.481 C 8.472 4.333,8.339 4.284,8.040 4.276 C 7.893 4.272,7.743 4.278,7.706 4.290 M7.786 10.530 C 7.597 10.592,7.410 10.753,7.319 10.932 C 7.249 11.072,7.237 11.325,7.294 11.495 C 7.388 11.780,7.697 12.000,8.000 12.000 C 8.303 12.000,8.612 11.780,8.706 11.495 C 8.763 11.325,8.751 11.072,8.681 10.932 C 8.616 10.804,8.460 10.646,8.333 10.580 C 8.217 10.520,7.904 10.491,7.786 10.530 " stroke="none" fill-rule="evenodd" fill="#000000"></path></svg>`,
    tags: [],
  },
{
    id: 150,
    name: "eslint",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.671 1.065 C 4.278 1.162,3.903 1.400,3.624 1.728 C 3.446 1.938,0.499 7.105,0.414 7.357 C 0.273 7.775,0.273 8.225,0.414 8.643 C 0.499 8.895,3.446 14.062,3.624 14.272 C 3.815 14.497,4.020 14.657,4.280 14.785 C 4.736 15.008,4.527 14.995,7.773 15.006 C 9.646 15.013,10.761 15.007,10.961 14.988 C 11.566 14.934,11.996 14.717,12.369 14.279 C 12.552 14.065,15.498 8.904,15.586 8.643 C 15.726 8.231,15.726 7.770,15.587 7.359 C 15.498 7.096,12.553 1.936,12.369 1.721 C 12.113 1.421,11.835 1.231,11.440 1.089 L 11.267 1.027 8.067 1.022 C 5.059 1.017,4.855 1.020,4.671 1.065 M11.061 2.557 C 11.115 2.585,11.181 2.630,11.206 2.658 C 11.231 2.686,11.912 3.866,12.719 5.280 C 14.174 7.827,14.187 7.851,14.187 7.998 C 14.187 8.145,14.174 8.169,12.708 10.735 C 11.894 12.158,11.207 13.342,11.181 13.365 C 11.027 13.500,11.188 13.493,8.000 13.493 C 5.146 13.493,5.034 13.491,4.939 13.443 C 4.885 13.415,4.819 13.370,4.794 13.342 C 4.769 13.314,4.088 12.134,3.281 10.720 C 1.816 8.155,1.813 8.150,1.813 7.999 C 1.813 7.848,1.816 7.842,3.282 5.277 C 4.089 3.864,4.770 2.685,4.795 2.657 C 4.820 2.630,4.882 2.586,4.933 2.558 C 5.023 2.511,5.158 2.509,7.994 2.508 C 10.855 2.507,10.966 2.508,11.061 2.557 M7.730 4.323 C 7.633 4.335,7.459 4.379,7.343 4.420 C 7.129 4.496,5.645 5.324,5.347 5.534 C 4.940 5.820,4.648 6.263,4.546 6.749 C 4.489 7.022,4.489 8.978,4.546 9.251 C 4.648 9.737,4.940 10.180,5.347 10.466 C 5.641 10.673,7.129 11.504,7.339 11.578 C 7.761 11.728,8.238 11.728,8.658 11.579 C 8.854 11.510,10.307 10.703,10.640 10.478 C 10.928 10.285,11.201 9.946,11.344 9.605 C 11.481 9.280,11.493 9.152,11.493 8.000 C 11.493 6.848,11.481 6.720,11.344 6.395 C 11.201 6.054,10.928 5.715,10.640 5.522 C 10.310 5.299,8.854 4.490,8.661 4.422 C 8.547 4.381,8.356 4.336,8.235 4.321 C 7.991 4.290,7.981 4.290,7.730 4.323 M8.940 6.263 C 9.374 6.511,9.765 6.739,9.809 6.770 C 9.853 6.801,9.914 6.879,9.944 6.942 C 9.998 7.052,10.000 7.098,10.000 8.000 C 10.000 8.902,9.998 8.948,9.944 9.058 C 9.914 9.121,9.853 9.199,9.809 9.230 C 9.765 9.261,9.374 9.489,8.940 9.737 C 8.174 10.174,8.147 10.187,7.999 10.187 C 7.852 10.187,7.826 10.174,7.077 9.745 C 6.110 9.191,6.125 9.201,6.057 9.060 C 6.002 8.948,6.000 8.907,6.000 8.000 C 6.000 7.093,6.002 7.052,6.057 6.940 C 6.125 6.799,6.110 6.809,7.077 6.255 C 7.826 5.826,7.852 5.813,7.999 5.813 C 8.147 5.813,8.174 5.826,8.940 6.263 " stroke="none" fill="#000000" fill-rule="evenodd"></path></svg>`,
    tags: [],
  },
{
    id: 151,
    name: "field",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.1011 3.05618L10.427 0.239701H10.367C10.1273 0.0799004 9.84769 0 9.52809 0C9.20849 0 8.90886 0.0799004 8.62921 0.239701L0.898876 4.79401C0.619226 4.95381 0.399501 5.17353 0.2397 5.45318C0.0799001 5.73284 0 6.01249 0 6.29214V11.3258C0 11.6454 0.0799001 11.9451 0.2397 12.2247C0.399501 12.5044 0.619226 12.7041 0.898876 12.824L5.57303 15.5805C5.85268 15.7403 6.15231 15.8202 6.47191 15.8202C6.79151 15.8202 7.09114 15.7403 7.37079 15.5805L15.1011 11.0861C15.3808 10.9263 15.6005 10.7066 15.7603 10.427C15.9201 10.1473 16 9.84769 16 9.52809V4.55431C16 4.23471 15.9201 3.95506 15.7603 3.71536C15.6005 3.43571 15.3808 3.21598 15.1011 3.05618ZM2.21723 5.75281L9.40824 1.55805C9.48814 1.5181 9.56804 1.5181 9.64794 1.55805L13.7228 3.95506L6.59176 8.08989C6.51186 8.16979 6.43196 8.16979 6.35206 8.08989L2.21723 5.75281ZM5.69288 13.9625L1.61798 11.5655C1.53808 11.5256 1.49813 11.4457 1.49813 11.3258V7.01124L5.69288 9.46817V13.9625ZM7.25094 9.46817L7.37079 9.40824L14.5019 5.27341V9.58802C14.5019 9.66792 14.4419 9.72784 14.3221 9.76779L7.25094 13.9625V9.46817Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 152,
    name: "go",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="nonzero" clip-rule="nonzero" d="M4.12903 5.54839C2.70378 5.54839 1.54839 6.70378 1.54839 8.12903C1.54839 9.55428 2.70378 10.7097 4.12903 10.7097C5.28455 10.7097 6.26269 9.95022 6.59153 8.90323H4.64516C4.21759 8.90323 3.87097 8.55661 3.87097 8.12903C3.87097 7.70146 4.21759 7.35484 4.64516 7.35484H7.8144C8.17678 5.44449 9.85518 4 11.871 4C14.1514 4 16 5.84863 16 8.12903C16 10.4094 14.1514 12.2581 11.871 12.2581C10.0971 12.2581 8.58443 11.1394 8 9.56909C7.41558 11.1394 5.90294 12.2581 4.12903 12.2581C1.84863 12.2581 0 10.4094 0 8.12903C0 5.84863 1.84863 4 4.12903 4C4.94646 4 5.71059 4.23833 6.35292 4.64957C6.71302 4.88011 6.81804 5.35892 6.5875 5.71902C6.35695 6.07912 5.87814 6.18414 5.51805 5.9536C5.11749 5.69715 4.64182 5.54839 4.12903 5.54839ZM11.871 5.54839C10.4457 5.54839 9.29032 6.70378 9.29032 8.12903C9.29032 9.55428 10.4457 10.7097 11.871 10.7097C13.2962 10.7097 14.4516 9.55428 14.4516 8.12903C14.4516 6.70378 13.2962 5.54839 11.871 5.54839Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 153,
    name: "graphql",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5.16065C2.5 4.98122 2.59614 4.81555 2.75193 4.72653L7.75193 1.86938C7.90565 1.78155 8.09435 1.78155 8.24807 1.86938L13.2481 4.72653C13.4039 4.81555 13.5 4.98122 13.5 5.16065V10.8394C13.5 11.0188 13.4039 11.1845 13.2481 11.2735L8.24807 14.1306C8.09435 14.2185 7.90565 14.2185 7.75193 14.1306L2.75193 11.2735C2.59614 11.1845 2.5 11.0188 2.5 10.8394V5.16065ZM1 10.8394C1 11.5571 1.38457 12.2198 2.00772 12.5758L7.00772 15.433C7.62259 15.7843 8.37741 15.7843 8.99228 15.433L13.9923 12.5758C14.6154 12.2198 15 11.5571 15 10.8394V5.16065C15 4.44293 14.6154 3.78025 13.9923 3.42416L8.99228 0.567019C8.37741 0.215667 7.62259 0.215667 7.00772 0.567019L2.00772 3.42416C1.38457 3.78025 1 4.44293 1 5.16065V10.8394Z" fill="#000000"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 0.270645L1.18226 11.75H14.8177L8 0.270645ZM3.81774 10.25L8 3.20812L12.1823 10.25H3.81774Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 154,
    name: "html",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="nonzero" clip-rule="nonzero" d="M3 1.5C2.86193 1.5 2.75 1.61193 2.75 1.75V11.3003C2.75 11.3896 2.79769 11.4722 2.87509 11.5168L7.73381 14.3194C7.80942 14.363 7.90231 14.364 7.97886 14.3221L13.1201 11.5048C13.2002 11.4609 13.25 11.3769 13.25 11.2856V1.75C13.25 1.61193 13.1381 1.5 13 1.5H3ZM1.25 1.75C1.25 0.783502 2.0335 0 3 0H13C13.9665 0 14.75 0.783503 14.75 1.75V11.2856C14.75 11.9248 14.4015 12.5131 13.841 12.8203L8.69968 15.6375C8.16383 15.9311 7.51363 15.924 6.98434 15.6187L2.12562 12.8162C1.58382 12.5037 1.25 11.9258 1.25 11.3003V1.75ZM5 4.25C5 3.83579 5.33579 3.5 5.75 3.5H10.3654C10.7796 3.5 11.1154 3.83579 11.1154 4.25C11.1154 4.66421 10.7796 5 10.3654 5H6.5V6.71154H10.3654C10.7796 6.71154 11.1154 7.04732 11.1154 7.46154V10.3462C11.1154 10.6302 10.9549 10.8899 10.7008 11.017L8.3931 12.1708C8.18196 12.2764 7.93343 12.2764 7.72228 12.1708L5.41459 11.017C5.1605 10.8899 5 10.6302 5 10.3462V9.76923C5 9.35502 5.33579 9.01923 5.75 9.01923C6.16421 9.01923 6.5 9.35502 6.5 9.76923V9.88263L8.05769 10.6615L9.61539 9.88263V8.21154H5.75C5.33579 8.21154 5 7.87575 5 7.46154V4.25Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 155,
    name: "interface",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.6825 4.52381C10.1396 4.52381 8.88889 5.77457 8.88889 7.31746C8.88889 8.86035 10.1396 10.1111 11.6825 10.1111C13.2254 10.1111 14.4762 8.86035 14.4762 7.31746C14.4762 5.77457 13.2254 4.52381 11.6825 4.52381ZM7.36508 7.31746C7.36508 4.93299 9.29807 3 11.6825 3C14.067 3 16 4.93299 16 7.31746C16 9.70193 14.067 11.6349 11.6825 11.6349C9.29807 11.6349 7.36508 9.70193 7.36508 7.31746Z" fill="#000000"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.12698 8.07937H3.55556V6.55556H8.12698V8.07937Z" fill="#000000"/>
<path d="M4.06349 7.31746C4.06349 8.15904 3.38126 8.84127 2.53968 8.84127C1.69811 8.84127 1.01587 8.15904 1.01587 7.31746C1.01587 6.47588 1.69811 5.79365 2.53968 5.79365C3.38126 5.79365 4.06349 6.47588 4.06349 7.31746Z" fill="#000000"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.53968 6.80952C2.25916 6.80952 2.03175 7.03693 2.03175 7.31746C2.03175 7.59799 2.25916 7.8254 2.53968 7.8254C2.82021 7.8254 3.04762 7.59799 3.04762 7.31746C3.04762 7.03693 2.82021 6.80952 2.53968 6.80952ZM0 7.31746C0 5.91483 1.13705 4.77778 2.53968 4.77778C3.94231 4.77778 5.07937 5.91483 5.07937 7.31746C5.07937 8.72009 3.94231 9.85714 2.53968 9.85714C1.13705 9.85714 0 8.72009 0 7.31746Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 156,
    name: "ionic",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 2.25C4.82436 2.25 2.25 4.82436 2.25 8C2.25 11.1756 4.82436 13.75 8 13.75C11.1756 13.75 13.75 11.1756 13.75 8C13.75 7.81089 13.7409 7.62413 13.7231 7.4401C13.6834 7.0278 13.9854 6.66132 14.3977 6.62154C14.81 6.58176 15.1764 6.88375 15.2162 7.29605C15.2386 7.52789 15.25 7.76272 15.25 8C15.25 12.0041 12.0041 15.25 8 15.25C3.99594 15.25 0.75 12.0041 0.75 8C0.75 3.99594 3.99594 0.75 8 0.75C9.3656 0.75 10.6451 1.12828 11.737 1.78618C12.0918 1.99996 12.2061 2.46087 11.9923 2.81565C11.7785 3.17043 11.3176 3.28474 10.9628 3.07097C10.0981 2.54992 9.08522 2.25 8 2.25Z" fill="#000000"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 10C6.89543 10 6 9.10457 6 8C6 6.89543 6.89543 6 8 6C9.10457 6 10 6.89543 10 8C10 9.10457 9.10457 10 8 10ZM8 11.5C9.933 11.5 11.5 9.933 11.5 8C11.5 6.067 9.933 4.5 8 4.5C6.067 4.5 4.5 6.067 4.5 8C4.5 9.933 6.067 11.5 8 11.5Z" fill="#000000"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 4.5C14.0523 4.5 14.5 4.05228 14.5 3.5C14.5 2.94772 14.0523 2.5 13.5 2.5C12.9477 2.5 12.5 2.94772 12.5 3.5C12.5 4.05228 12.9477 4.5 13.5 4.5ZM13.5 6C14.8807 6 16 4.88071 16 3.5C16 2.11929 14.8807 1 13.5 1C12.1193 1 11 2.11929 11 3.5C11 4.88071 12.1193 6 13.5 6Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 157,
    name: "java",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="nonzero" clip-rule="nonzero" d="M4.45262 0.77086C4.71879 0.451461 5.19348 0.408307 5.51288 0.674473C6.27367 1.30846 6.56914 2.05693 6.4059 2.79543C6.26691 3.42419 5.82892 3.87253 5.4875 4.11099C5.27416 4.29388 5.18522 4.43743 5.14847 4.52681C5.11339 4.61211 5.11415 4.67467 5.12613 4.72887C5.15746 4.87054 5.29291 5.0395 5.44856 5.14327C5.7945 5.37389 5.88798 5.84129 5.65735 6.18722C5.42673 6.53316 4.95933 6.62664 4.61339 6.39602C4.26717 6.1652 3.80036 5.70682 3.65602 5.05387C3.49275 4.31537 3.78822 3.56689 4.54901 2.9329L4.5799 2.90715L4.61336 2.88485C4.76901 2.78108 4.90445 2.61213 4.93577 2.47046C4.94775 2.41627 4.94851 2.3537 4.91343 2.2684C4.87525 2.17555 4.78076 2.02424 4.54901 1.83112C4.22961 1.56495 4.18646 1.09026 4.45262 0.77086ZM9.1224 2.77835C9.38857 3.09775 9.34542 3.57244 9.02602 3.83861C8.79427 4.03173 8.69978 4.18303 8.66159 4.27588C8.62651 4.36119 8.62728 4.42375 8.63926 4.47794C8.67057 4.61962 8.80602 4.78857 8.96166 4.89233C9.3076 5.12296 9.40108 5.59035 9.17045 5.93629C8.93983 6.28223 8.47243 6.3757 8.1265 6.14508C7.78027 5.91426 7.31347 5.45587 7.16913 4.80292C7.00588 4.06442 7.30136 3.31595 8.06214 2.68196C8.38154 2.41579 8.85624 2.45895 9.1224 2.77835ZM0.207849 7.59455C0.29163 7.25942 0.59274 7.02432 0.938179 7.02432H12.4962C12.8417 7.02432 13.1428 7.25942 13.2266 7.59455C13.3354 8.03003 13.3631 8.58563 13.3041 9.20747H15.1472C15.563 9.20747 15.9 9.54451 15.9 9.96027C15.9 10.6991 15.8551 11.8958 15.103 12.8984C14.3624 13.8856 13.0731 14.5203 11.0103 14.5882C10.7408 14.9262 10.444 15.2603 10.1177 15.5866C9.97652 15.7278 9.78504 15.8071 9.58538 15.8071H3.84904C3.64938 15.8071 3.4579 15.7278 3.31672 15.5866C1.86788 14.1377 0.999928 12.5367 0.537609 11.1148C0.0832301 9.7174 0.000142552 8.42537 0.207849 7.59455ZM9.26725 14.3015C9.54933 14.0025 9.80359 13.6979 10.0322 13.3914C10.965 12.1406 11.4703 10.8584 11.691 9.80577C11.7965 9.30267 11.8334 8.87025 11.8284 8.52994H1.60604C1.59838 9.05604 1.69095 9.79279 1.96944 10.6493C2.34144 11.7933 3.02818 13.0942 4.16717 14.3015H9.26725ZM12.0935 12.9643C13.0969 12.7691 13.6142 12.3739 13.8986 11.9949C14.1788 11.6214 14.3043 11.176 14.3577 10.7131H13.0182C12.8197 11.4239 12.5193 12.189 12.0935 12.9643Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 158,
    name: "javascript",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="nonzero" clip-rule="nonzero" d="M0 1.75C0 0.783501 0.783502 0 1.75 0H14.25C15.2165 0 16 0.783502 16 1.75V3.75C16 4.16421 15.6642 4.5 15.25 4.5C14.8358 4.5 14.5 4.16421 14.5 3.75V1.75C14.5 1.61193 14.3881 1.5 14.25 1.5H1.75C1.61193 1.5 1.5 1.61193 1.5 1.75V14.25C1.5 14.3881 1.61193 14.5 1.75 14.5H15.25C15.6642 14.5 16 14.8358 16 15.25C16 15.6642 15.6642 16 15.25 16H1.75C0.783501 16 0 15.2165 0 14.25V1.75ZM8.25 5.75C8.66421 5.75 9 6.08579 9 6.5V10.5C9 11.5048 8.72399 12.2584 8.15514 12.7324C7.61223 13.1848 6.95384 13.25 6.5 13.25C6.08579 13.25 5.75 12.9142 5.75 12.5C5.75 12.0858 6.08579 11.75 6.5 11.75C6.84617 11.75 7.06277 11.6902 7.19486 11.5801C7.301 11.4916 7.5 11.2452 7.5 10.5V6.5C7.5 6.08579 7.83578 5.75 8.25 5.75ZM11.2757 6.58011C11.6944 6.08164 12.3507 5.75 13.25 5.75C14.0849 5.75 14.7148 6.03567 15.1394 6.48481C15.4239 6.78583 15.4105 7.26052 15.1095 7.54505C14.8085 7.82958 14.3338 7.81621 14.0493 7.51519C13.9394 7.39898 13.7204 7.25 13.25 7.25C12.7493 7.25 12.5306 7.41836 12.4243 7.54489C12.2934 7.70065 12.25 7.896 12.25 8C12.25 8.104 12.2934 8.29935 12.4243 8.45511C12.5306 8.58164 12.7493 8.75 13.25 8.75C13.3257 8.75 13.3988 8.76121 13.4676 8.78207C14.1307 8.87646 14.6319 9.17251 14.9743 9.58011C15.3684 10.0493 15.5 10.604 15.5 11C15.5 11.396 15.3684 11.9507 14.9743 12.4199C14.5556 12.9184 13.8993 13.25 13 13.25C12.1651 13.25 11.5352 12.9643 11.1106 12.5152C10.8261 12.2142 10.8395 11.7395 11.1405 11.4549C11.4415 11.1704 11.9162 11.1838 12.2007 11.4848C12.3106 11.601 12.5296 11.75 13 11.75C13.5007 11.75 13.7194 11.5816 13.8257 11.4551C13.9566 11.2993 14 11.104 14 11C14 10.896 13.9566 10.7007 13.8257 10.5449C13.7194 10.4184 13.5007 10.25 13 10.25C12.9243 10.25 12.8512 10.2388 12.7824 10.2179C12.1193 10.1235 11.6181 9.82749 11.2757 9.41989C10.8816 8.95065 10.75 8.396 10.75 8C10.75 7.604 10.8816 7.04935 11.2757 6.58011Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 159,
    name: "json",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 1.5c.084 0 .167.002.25.005v.002h.07a6.468 6.468 0 012.22.508c.097.051.189.106.277.164.617.402 1.066.967 1.383 1.623.644 1.335.71 2.985.557 4.101-.271 1.899-1.09 2.822-1.907 3.273a3.23 3.23 0 01-.394.184C11.054 10.567 11.5 9.466 11.5 8c0-3.195-2.118-4.65-3.303-4.974l-.017-.004-.017-.004c-.888-.197-2.245-.185-3.488.5-1.283.708-2.339 2.076-2.667 4.376l-.001.004c-.1.73-.126 1.672.014 2.657A6.5 6.5 0 018 1.5zM8.364.008a8 8 0 102.816.649C10.4.255 9.465.023 8.364.008zm5.956 6.465a6.5 6.5 0 01-6.893 8.002c-.84-.075-1.488-.317-1.994-.646-.618-.403-1.066-.968-1.383-1.624-.644-1.335-.71-2.985-.557-4.1.271-1.9 1.09-2.823 1.907-3.273.13-.072.261-.133.394-.184-.597.792-1.044 1.892-1.044 3.36 0 3.195 2.118 4.65 3.303 4.973l.017.005.017.003c.888.198 2.245.186 3.488-.5 1.283-.708 2.339-2.075 2.668-4.376V8.11a9.565 9.565 0 00.077-1.637zM8.133 4.6C8.867 4.954 10 5.943 10 8c0 2.072-1.15 3.06-1.883 3.407-.734-.354-1.867-1.342-1.867-3.4 0-2.071 1.15-3.06 1.883-3.407z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 160,
    name: "keyword",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 2.96491C0 1.87972 0.879721 1 1.96491 1H4.77193C5.85712 1 6.73684 1.87972 6.73684 2.96491V3.52632C6.73684 4.61151 5.85712 5.49123 4.77193 5.49123H1.96491C0.879721 5.49123 0 4.61151 0 3.52632V2.96491ZM1.96491 2.68421C1.80989 2.68421 1.68421 2.80989 1.68421 2.96491V3.52632C1.68421 3.68134 1.80989 3.80702 1.96491 3.80702H4.77193C4.92696 3.80702 5.05263 3.68134 5.05263 3.52632V2.96491C5.05263 2.80988 4.92696 2.68421 4.77193 2.68421H1.96491Z" fill="#000000"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.14035 3.24561C8.14035 2.78053 8.51737 2.40351 8.98246 2.40351H15.1579C15.623 2.40351 16 2.78053 16 3.24561C16 3.7107 15.623 4.08772 15.1579 4.08772H8.98246C8.51737 4.08772 8.14035 3.7107 8.14035 3.24561Z" fill="#000000"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.280702 8.29825C0.280702 7.83316 0.657725 7.45614 1.12281 7.45614H11.7895C12.2546 7.45614 12.6316 7.83316 12.6316 8.29825C12.6316 8.76333 12.2546 9.14035 11.7895 9.14035H1.12281C0.657725 9.14035 0.280702 8.76333 0.280702 8.29825Z" fill="#000000"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.280702 13.3509C0.280702 12.8858 0.657725 12.5088 1.12281 12.5088H14.5965C15.0616 12.5088 15.4386 12.8858 15.4386 13.3509C15.4386 13.816 15.0616 14.193 14.5965 14.193H1.12281C0.657725 14.193 0.280702 13.816 0.280702 13.3509Z" fill="#000000"/>
<path d="M14.8772 9.14035C15.3423 9.14035 15.7193 8.76333 15.7193 8.29825C15.7193 7.83316 15.3423 7.45614 14.8772 7.45614C14.4121 7.45614 14.0351 7.83316 14.0351 8.29825C14.0351 8.76333 14.4121 9.14035 14.8772 9.14035Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 161,
    name: "kotlin",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.25 2C1.25 1.58579 1.58579 1.25 2 1.25H14C14.3033 1.25 14.5768 1.43273 14.6929 1.71299C14.809 1.99324 14.7448 2.31583 14.5303 2.53033L9.06066 8L14.5303 13.4697C14.7448 13.6842 14.809 14.0068 14.6929 14.287C14.5768 14.5673 14.3033 14.75 14 14.75H2C1.58579 14.75 1.25 14.4142 1.25 14V2ZM2.75 2.75V13.25H12.1893L7.46967 8.53033C7.17678 8.23744 7.17678 7.76256 7.46967 7.46967L12.1893 2.75H2.75Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 162,
    name: "kubernetes",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2.687 3.21l5.062 4.117c-.477.099-.837.53-.837 1.045 0 .133.024.26.067.377L1.706 4.462a.81.81 0 01-.124-1.126.776.776 0 011.105-.126z" fill="#000000"/>
  <path d="M7.482 9.322L1.06 10.808a.786.786 0 01-.94-.603.801.801 0 01.592-.958L7.095 7.77a1.076 1.076 0 00-.183.602c0 .414.232.773.57.95z" fill="#000000"/>
  <path d="M8.429 9.327l-2.905 6.12a.78.78 0 01-1.05.373.807.807 0 01-.365-1.07l2.86-6.028c.143.418.533.718.991.718.169 0 .328-.04.469-.113z" fill="#000000"/>
  <path d="M8.97 8.66l2.89 6.09a.807.807 0 01-.365 1.07.78.78 0 01-1.05-.372l-2.89-6.091c.124.053.261.083.405.083.481 0 .886-.33 1.01-.78z" fill="#000000"/>
  <path d="M8.462 9.31a1.07 1.07 0 00.546-.938c0-.233-.073-.448-.198-.624l6.478 1.499a.8.8 0 01.592.958.786.786 0 01-.94.603L8.462 9.31zM8.746.9v6.766a1.037 1.037 0 00-1.572 0V.901c0-.443.352-.801.786-.801.434 0 .786.358.786.8z" fill="#000000"/>
  <path d="M13.234 3.21a.776.776 0 011.104.126.81.81 0 01-.123 1.126L8.94 8.749c.043-.117.067-.244.067-.377 0-.516-.36-.946-.837-1.045l5.063-4.117z" fill="#000000"/>
  <path d="M7.96 3.302c-2.75 0-4.978 2.27-4.978 5.07 0 2.8 2.229 5.07 4.978 5.07 2.75 0 4.978-2.27 4.978-5.07 0-2.8-2.229-5.07-4.978-5.07zm-6.55 5.07c0-3.684 2.933-6.67 6.55-6.67 3.618 0 6.55 2.986 6.55 6.67 0 3.685-2.932 6.671-6.55 6.671-3.617 0-6.55-2.986-6.55-6.67z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 163,
    name: "layout",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.547 0.309 C 1.258 0.384,1.016 0.529,0.773 0.773 C 0.524 1.022,0.416 1.198,0.316 1.520 L 0.253 1.720 0.253 8.000 L 0.253 14.280 0.316 14.480 C 0.416 14.802,0.524 14.978,0.773 15.227 C 1.022 15.476,1.198 15.584,1.520 15.684 L 1.720 15.747 8.000 15.747 L 14.280 15.747 14.480 15.684 C 14.802 15.584,14.978 15.476,15.227 15.227 C 15.476 14.978,15.584 14.802,15.684 14.480 L 15.747 14.280 15.747 8.000 L 15.747 1.720 15.684 1.520 C 15.584 1.198,15.476 1.022,15.227 0.773 C 14.980 0.525,14.739 0.382,14.441 0.307 C 14.207 0.248,1.774 0.249,1.547 0.309 M14.170 1.830 L 14.240 1.901 14.240 3.324 L 14.240 4.747 8.000 4.747 L 1.760 4.747 1.760 3.324 L 1.760 1.901 1.830 1.830 L 1.901 1.760 8.000 1.760 L 14.099 1.760 14.170 1.830 M4.747 10.267 L 4.747 14.267 3.403 14.267 C 2.665 14.267,2.023 14.259,1.977 14.250 C 1.931 14.241,1.864 14.203,1.827 14.166 L 1.760 14.099 1.760 10.183 L 1.760 6.267 3.253 6.267 L 4.747 6.267 4.747 10.267 M14.240 10.183 L 14.240 14.099 14.173 14.166 C 14.136 14.203,14.069 14.241,14.023 14.250 C 13.977 14.259,12.214 14.267,10.103 14.267 L 6.267 14.267 6.267 10.267 L 6.267 6.267 10.253 6.267 L 14.240 6.267 14.240 10.183 " stroke="none" fill-rule="evenodd" fill="#000000"></path></svg>`,
    tags: [],
  },
{
    id: 164,
    name: "loading",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.706 0.290 C 7.484 0.362,7.356 0.490,7.294 0.699 C 7.259 0.816,7.253 1.088,7.253 2.508 C 7.253 4.389,7.251 4.365,7.443 4.557 C 7.700 4.813,8.300 4.813,8.557 4.557 C 8.749 4.365,8.747 4.389,8.747 2.508 C 8.747 0.688,8.744 0.656,8.596 0.480 C 8.472 0.333,8.339 0.284,8.040 0.276 C 7.893 0.272,7.743 0.278,7.706 0.290 M2.753 2.266 C 2.595 2.338,2.362 2.566,2.281 2.728 C 2.197 2.897,2.193 3.085,2.269 3.253 C 2.343 3.418,4.667 5.750,4.850 5.843 C 5.109 5.976,5.375 5.911,5.643 5.649 C 5.907 5.391,5.977 5.111,5.843 4.850 C 5.750 4.667,3.418 2.343,3.253 2.269 C 3.101 2.200,2.901 2.199,2.753 2.266 M12.853 2.282 C 12.730 2.339,12.520 2.536,11.518 3.541 C 10.597 4.464,10.316 4.762,10.271 4.860 C 10.195 5.025,10.196 5.216,10.272 5.378 C 10.342 5.528,10.572 5.764,10.727 5.845 C 10.884 5.927,11.117 5.926,11.280 5.843 C 11.447 5.757,13.757 3.447,13.843 3.280 C 13.926 3.118,13.927 2.884,13.846 2.729 C 13.764 2.572,13.552 2.364,13.392 2.283 C 13.213 2.192,13.048 2.192,12.853 2.282 M0.699 7.292 C 0.404 7.385,0.258 7.620,0.258 7.999 C 0.259 8.386,0.403 8.618,0.698 8.706 C 0.816 8.741,1.079 8.747,2.508 8.747 C 3.997 8.747,4.196 8.742,4.318 8.702 C 4.498 8.644,4.644 8.498,4.702 8.318 C 4.788 8.053,4.745 7.677,4.608 7.491 C 4.578 7.451,4.492 7.384,4.417 7.343 L 4.280 7.267 2.547 7.261 C 1.152 7.257,0.791 7.263,0.699 7.292 M11.745 7.278 C 11.622 7.308,11.452 7.411,11.392 7.492 C 11.255 7.677,11.212 8.053,11.298 8.318 C 11.356 8.498,11.502 8.644,11.682 8.702 C 11.804 8.742,12.003 8.747,13.492 8.747 C 14.921 8.747,15.184 8.741,15.302 8.706 C 15.597 8.618,15.741 8.386,15.742 7.999 C 15.742 7.614,15.595 7.383,15.290 7.291 C 15.187 7.260,14.864 7.254,13.496 7.256 C 12.578 7.258,11.790 7.268,11.745 7.278 M4.853 10.282 C 4.730 10.339,4.520 10.536,3.518 11.541 C 2.597 12.464,2.316 12.762,2.271 12.860 C 2.195 13.025,2.196 13.216,2.272 13.378 C 2.342 13.528,2.572 13.764,2.727 13.845 C 2.884 13.927,3.117 13.926,3.280 13.843 C 3.447 13.757,5.757 11.447,5.843 11.280 C 5.926 11.118,5.927 10.884,5.846 10.729 C 5.764 10.572,5.552 10.364,5.392 10.283 C 5.213 10.192,5.048 10.192,4.853 10.282 M10.753 10.266 C 10.595 10.338,10.362 10.566,10.281 10.728 C 10.197 10.897,10.193 11.085,10.269 11.253 C 10.343 11.418,12.667 13.750,12.850 13.843 C 13.109 13.976,13.375 13.911,13.643 13.649 C 13.907 13.391,13.977 13.111,13.843 12.850 C 13.750 12.667,11.418 10.343,11.253 10.269 C 11.101 10.200,10.901 10.199,10.753 10.266 M7.745 11.277 C 7.620 11.309,7.451 11.412,7.392 11.492 C 7.254 11.678,7.253 11.691,7.253 13.489 C 7.253 14.921,7.259 15.184,7.294 15.302 C 7.382 15.597,7.615 15.741,8.000 15.741 C 8.385 15.741,8.618 15.597,8.706 15.302 C 8.768 15.090,8.767 11.875,8.704 11.690 C 8.644 11.514,8.575 11.430,8.420 11.346 C 8.310 11.286,8.246 11.271,8.057 11.264 C 7.930 11.259,7.790 11.265,7.745 11.277 " stroke="none" fill-rule="evenodd" fill="#000000"></path></svg>`,
    tags: [],
  },
{
    id: 165,
    name: "lua",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3.259 12.714a5.727 5.727 0 008.147 0 5.845 5.845 0 000-8.217 5.727 5.727 0 00-8.147 0 5.845 5.845 0 000 8.217zm-1.111 1.12c-2.864-2.887-2.864-7.57 0-10.457a7.289 7.289 0 0110.369 0c2.863 2.888 2.863 7.57 0 10.457a7.289 7.289 0 01-10.37 0zM15.54 2.705a1.562 1.562 0 01-2.222 0 1.594 1.594 0 010-2.24 1.562 1.562 0 012.222 0 1.594 1.594 0 010 2.24z" fill="#000000"/>
  <path d="M11.844 8.673a3.124 3.124 0 01-4.444 0 3.188 3.188 0 010-4.481 3.124 3.124 0 014.444 0 3.188 3.188 0 010 4.481zM8.51 7.553a1.562 1.562 0 002.222 0 1.594 1.594 0 000-2.24 1.562 1.562 0 00-2.222 0 1.594 1.594 0 000 2.24z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 166,
    name: "next",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5C9.35329 14.5 10.6088 14.0871 11.6492 13.3799L6 6.57712V11.25C6 11.6642 5.66421 12 5.25 12C4.83579 12 4.5 11.6642 4.5 11.25V4.5C4.5 4.184 4.69807 3.9019 4.99529 3.79458C5.29251 3.68726 5.62511 3.77775 5.82699 4.02085L13.3008 13.0209C13.5622 13.3357 13.523 13.802 13.2127 14.0687C11.813 15.272 9.99057 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 8.76428 15.8926 9.50473 15.6916 10.2065C15.5936 10.5489 15.4733 10.8818 15.3325 11.2037C15.1665 11.5832 14.7243 11.7562 14.3448 11.5902C13.9653 11.4242 13.7922 10.982 13.9583 10.6025C14.0725 10.3413 14.1701 10.0712 14.2496 9.79351C14.4125 9.2247 14.5 8.6232 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5ZM10.5 3.75C10.9142 3.75 11.25 4.08579 11.25 4.5V7.5C11.25 7.91421 10.9142 8.25 10.5 8.25C10.0858 8.25 9.75 7.91421 9.75 7.5V4.5C9.75 4.08579 10.0858 3.75 10.5 3.75Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 167,
    name: "nginx",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="nonzero" clip-rule="nonzero" d="M7.62016 0.102166C7.85488 -0.0340553 8.14512 -0.0340553 8.37984 0.102166L14.626 3.72717C14.8576 3.86157 15 4.10825 15 4.375V11.625C15 11.8918 14.8576 12.1384 14.626 12.2728L8.37984 15.8978C8.14512 16.0341 7.85488 16.0341 7.62016 15.8978L1.374 12.2728C1.14241 12.1384 1 11.8918 1 11.625V4.375C1 4.10825 1.14241 3.86157 1.374 3.72717L7.62016 0.102166ZM2.50769 4.80578V11.1942L8 14.3817L13.4923 11.1942V4.80578L8 1.61828L2.50769 4.80578ZM4.98331 4.55709C5.265 4.441 5.58925 4.50517 5.80484 4.71967L10.0462 8.93934V5.25C10.0462 4.83579 10.3837 4.5 10.8 4.5C11.2163 4.5 11.5538 4.83579 11.5538 5.25V10.75C11.5538 11.0533 11.3702 11.3268 11.0885 11.4429C10.8068 11.559 10.4825 11.4948 10.2669 11.2803L6.02564 7.06066V10.75C6.02564 11.1642 5.68813 11.5 5.27179 11.5C4.85546 11.5 4.51795 11.1642 4.51795 10.75V5.25C4.51795 4.94665 4.70162 4.67318 4.98331 4.55709Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 168,
    name: "node",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="nonzero" clip-rule="nonzero" d="M7.58638 0.102166C7.8199 -0.0340553 8.10867 -0.0340553 8.34219 0.102166L14.5565 3.72717C14.7869 3.86157 14.9286 4.10825 14.9286 4.375V11.625C14.9286 11.8918 14.7869 12.1384 14.5565 12.2728L8.34219 15.8978C8.10867 16.0341 7.8199 16.0341 7.58638 15.8978L6.03281 14.9916C5.67502 14.7829 5.55417 14.3236 5.76288 13.9658C5.97159 13.6081 6.43083 13.4872 6.78862 13.6959L7.96429 14.3817L13.4286 11.1942V4.80578L7.96429 1.61828L2.5 4.80578V11.1942L3.6168 11.8457C3.96098 11.9561 4.38611 11.9831 4.68576 11.8507C4.82477 11.7893 4.95031 11.6893 5.04968 11.5107C5.15426 11.3227 5.25 11.0098 5.25 10.5V5.25C5.25 4.83579 5.58579 4.5 6 4.5C6.41421 4.5 6.75 4.83579 6.75 5.25V10.5C6.75 11.1902 6.62104 11.7716 6.36047 12.2399C6.09471 12.7176 5.71466 13.036 5.29192 13.2228C4.48562 13.579 3.59523 13.433 3.04999 13.2371C3.00686 13.2216 2.96525 13.2022 2.92567 13.1791L1.3721 12.2728C1.14168 12.1384 1 11.8918 1 11.625V4.375C1 4.10825 1.14168 3.86157 1.3721 3.72717L7.58638 0.102166ZM8.24655 5.28323C8.64339 4.81081 9.26318 4.5 10.1042 4.5C10.8847 4.5 11.4792 4.76756 11.8815 5.19314C12.166 5.49417 12.1527 5.96885 11.8516 6.25338C11.5506 6.53792 11.0759 6.52455 10.7914 6.22352C10.7038 6.13087 10.5202 6 10.1042 6C9.66182 6 9.47952 6.14753 9.39511 6.24802C9.28615 6.37774 9.25 6.54184 9.25 6.625C9.25 6.70816 9.28615 6.87226 9.39511 7.00198C9.47952 7.10247 9.66182 7.25 10.1042 7.25C10.1782 7.25 10.2497 7.26073 10.3173 7.28072C10.9368 7.37001 11.4089 7.64784 11.7326 8.03323C12.1049 8.47643 12.2292 8.99983 12.2292 9.375C12.2292 9.75017 12.1049 10.2736 11.7326 10.7168C11.3358 11.1892 10.716 11.5 9.87501 11.5C9.0945 11.5 8.49996 11.2324 8.09768 10.8069C7.81315 10.5058 7.82652 10.0311 8.12755 9.74662C8.42857 9.46208 8.90325 9.47546 9.18779 9.77648C9.27536 9.86913 9.459 10 9.87501 10C10.3174 10 10.4997 9.85247 10.5841 9.75198C10.693 9.62226 10.7292 9.45816 10.7292 9.375C10.7292 9.29184 10.693 9.12774 10.5841 8.99802C10.4997 8.89753 10.3174 8.75 9.87501 8.75C9.80097 8.75 9.72943 8.73927 9.66188 8.71928C9.04237 8.62999 8.57028 8.35216 8.24655 7.96677C7.87427 7.52357 7.75 7.00017 7.75 6.625C7.75 6.24983 7.87427 5.72643 8.24655 5.28323Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 169,
    name: "not-found",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.493 0.015 C 7.442 0.021,7.268 0.039,7.107 0.055 C 5.234 0.242,3.347 1.208,2.071 2.634 C 0.660 4.211,-0.057 6.168,0.009 8.253 C 0.124 11.854,2.599 14.903,6.110 15.771 C 8.169 16.280,10.433 15.917,12.227 14.791 C 14.017 13.666,15.270 11.933,15.771 9.887 C 15.943 9.186,15.983 8.829,15.983 8.000 C 15.983 7.171,15.943 6.814,15.771 6.113 C 14.979 2.878,12.315 0.498,9.000 0.064 C 8.716 0.027,7.683 -0.006,7.493 0.015 M8.853 1.563 C 9.548 1.653,10.198 1.848,10.840 2.160 C 11.538 2.500,12.020 2.846,12.587 3.413 C 13.154 3.980,13.500 4.462,13.840 5.160 C 14.285 6.075,14.486 6.958,14.486 8.000 C 14.486 9.054,14.284 9.932,13.826 10.867 C 13.654 11.218,13.307 11.781,13.145 11.972 L 13.090 12.037 8.527 7.473 L 3.963 2.910 4.028 2.855 C 4.219 2.693,4.782 2.346,5.133 2.174 C 6.305 1.600,7.555 1.395,8.853 1.563 M7.480 8.534 L 12.040 13.095 11.973 13.148 C 11.734 13.338,11.207 13.662,10.867 13.828 C 10.239 14.135,9.591 14.336,8.880 14.444 C 8.456 14.509,7.544 14.509,7.120 14.444 C 5.172 14.148,3.528 13.085,2.493 11.451 C 2.279 11.114,1.999 10.526,1.859 10.119 C 1.468 8.989,1.403 7.738,1.670 6.535 C 1.849 5.734,2.268 4.820,2.766 4.147 C 2.836 4.052,2.899 3.974,2.907 3.974 C 2.914 3.974,4.972 6.026,7.480 8.534 " stroke="none" fill-rule="evenodd" fill="#000000"></path></svg>`,
    tags: [],
  },
{
    id: 170,
    name: "npm",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="nonzero" clip-rule="nonzero" d="M1 2.88462C1 1.84377 1.84377 1 2.88462 1H13.1154C14.1562 1 15 1.84377 15 2.88462V13.1154C15 14.1562 14.1562 15 13.1154 15H2.88462C1.84377 15 1 14.1562 1 13.1154V2.88462ZM2.88462 2.61538C2.73592 2.61538 2.61538 2.73592 2.61538 2.88462V13.1154C2.61538 13.2641 2.73592 13.3846 2.88462 13.3846H8.53846V6.38462C8.53846 5.93854 8.90008 5.57692 9.34615 5.57692C9.79223 5.57692 10.1538 5.93854 10.1538 6.38462V13.3846H13.1154C13.2641 13.3846 13.3846 13.2641 13.3846 13.1154V2.88462C13.3846 2.73592 13.2641 2.61538 13.1154 2.61538H2.88462Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 171,
    name: "perl",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="nonzero" clip-rule="nonzero" d="M9.99877 2.16014C9.71156 2.63517 9.5186 3.33735 9.40279 4.17003C9.36074 4.47236 9.14507 4.72 8.8548 4.79923C8.50312 4.89524 7.94701 5.143 7.49381 5.54927C7.05199 5.94535 6.75 6.44889 6.75 7.09316C6.75 7.51394 6.41421 7.85506 6 7.85506C5.58579 7.85506 5.25 7.51394 5.25 7.09316V3.35581C5.21547 3.1973 5.13267 2.9726 4.99855 2.79487C4.86302 2.61529 4.71082 2.52178 4.5 2.52178C4.28918 2.52178 4.13698 2.61529 4.00145 2.79487C3.85151 2.99355 3.76572 3.25094 3.7398 3.40893C3.67952 3.77631 3.36663 4.04557 3 4.04557H2.01456C1.83423 4.05351 1.67171 4.09501 1.57751 4.15327C1.5377 4.17788 1.52463 4.19643 1.51982 4.20464C1.51666 4.21004 1.5 4.23854 1.5 4.31741C1.5 4.47506 1.52869 4.56448 1.55087 4.61132C1.57217 4.65631 1.59847 4.68572 1.63066 4.70967C1.70862 4.76767 1.84538 4.80747 2 4.80747H3.5C3.91421 4.80747 4.25 5.14858 4.25 5.56936V8.38085C4.25 8.3811 4.25 8.38059 4.25 8.38085L4.25003 8.38258L4.25025 8.38746C4.25049 8.39174 4.25094 8.39763 4.25174 8.40513C4.25336 8.42029 4.25622 8.44026 4.26098 8.4646C4.27058 8.5136 4.28679 8.57471 4.31202 8.64334C4.36272 8.78133 4.44471 8.93605 4.567 9.07953C4.79388 9.34572 5.20884 9.6328 6 9.63281H9.25C9.66421 9.6328 10 9.97392 10 10.3947C10 10.8155 9.66422 11.1566 9.25 11.1566L9.25 12.6546L10.192 14.9441C10.3517 15.3323 10.1714 15.7786 9.78922 15.9409C9.40705 16.1031 8.96774 15.92 8.80801 15.5317L7.80801 13.1012C7.76972 13.0081 7.75 12.9082 7.75 12.8074V11.1566H6.75V15.22C6.75 15.6408 6.41421 15.9819 6 15.9819C5.58579 15.9819 5.25 15.6408 5.25 15.22V11.0913C4.43602 10.9426 3.84007 10.5546 3.433 10.077C2.94029 9.49888 2.75 8.81849 2.75 8.38085V6.33126H2C1.65462 6.33126 1.16638 6.25301 0.74434 5.939C0.282895 5.59567 0 5.04382 0 4.31741C0 3.61779 0.347977 3.12971 0.797494 2.8517C1.20124 2.60201 1.65865 2.53351 1.97363 2.52225C1.98242 2.52194 1.99121 2.52178 2 2.52178H2.44323C2.53179 2.30456 2.65221 2.07821 2.81105 1.86775C3.15468 1.41242 3.71082 0.997992 4.5 0.997992C5.28918 0.997992 5.84532 1.41242 6.18895 1.86775C6.51818 2.30398 6.68238 2.80848 6.7398 3.15842C6.74659 3.19982 6.75 3.24171 6.75 3.28368V4.19919C7.16334 3.87783 7.60424 3.64406 7.99205 3.48838C8.1284 2.73307 8.34926 1.97684 8.7206 1.36265C9.19096 0.58468 9.93263 0 11 0C11.8697 0 12.5351 0.420693 13.0041 1.0259C13.453 1.6051 13.7311 2.3586 13.9104 3.11407C14.2281 4.4531 14.2822 6.00802 14.2613 7.18254C14.4409 7.266 14.7113 7.39608 14.9741 7.61389C15.5928 8.12663 16 8.96783 16 10.3947V15.22C16 15.6408 15.6642 15.9819 15.25 15.9819C14.8358 15.9819 14.5 15.6408 14.5 15.22V10.3947C14.5 9.28193 14.1989 8.93796 14.0259 8.79462C13.911 8.6994 13.7839 8.63621 13.6026 8.5521C13.5969 8.54948 13.5911 8.54678 13.5851 8.54399C13.5066 8.50765 13.3984 8.45761 13.2999 8.40065C13.1928 8.33872 13.0413 8.2382 12.9143 8.07704C12.8022 7.93465 12.7441 7.75612 12.7505 7.57389C12.7915 6.40768 12.7631 4.78159 12.4521 3.47116C12.296 2.81312 12.0835 2.30126 11.8256 1.96848C11.5878 1.6617 11.3303 1.52379 11 1.52379C10.5714 1.52379 10.264 1.72151 9.99877 2.16014ZM11.5 8.10903C11.9142 8.10903 12.25 8.45014 12.25 8.87092C12.25 9.66499 12.43 10.1845 12.6148 10.503C12.7083 10.6641 12.8049 10.7771 12.885 10.8514C12.9251 10.8887 12.9598 10.9151 12.9865 10.9328C13.014 10.951 13.0288 10.9572 13.0285 10.9571C13.3133 11.0728 13.5 11.353 13.5 11.6645V15.22C13.5 15.6408 13.1642 15.9819 12.75 15.9819C12.3358 15.9819 12 15.6408 12 15.22V12.0878C11.3618 11.5738 10.75 10.5212 10.75 8.87092C10.75 8.45014 11.0858 8.10903 11.5 8.10903Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 172,
    name: "php",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="nonzero" clip-rule="nonzero" d="M7.19792 3.06C5.60434 3.06 4.3125 4.34978 4.3125 5.9408V12.3472C4.3125 13.5362 3.34711 14.5 2.15625 14.5C0.965386 14.5 0 13.5362 0 12.3472C0 11.9164 0.349778 11.5672 0.78125 11.5672C1.21272 11.5672 1.5625 11.9164 1.5625 12.3472C1.5625 12.6746 1.82833 12.94 2.15625 12.94C2.48417 12.94 2.75 12.6746 2.75 12.3472V5.9408C2.75 3.48821 4.7414 1.5 7.19792 1.5C9.22509 1.5 10.9355 2.85396 11.4715 4.70551C13.9858 4.78385 16 6.84348 16 9.3728C16 9.41167 15.9972 9.44987 15.9917 9.48721C15.9972 9.52454 16 9.56274 16 9.6016V13.72C16 14.1508 15.6502 14.5 15.2187 14.5H7.19792C6.76644 14.5 6.41667 14.1508 6.41667 13.72V9.6016C6.41667 9.17082 6.76644 8.8216 7.19792 8.8216C8.79149 8.8216 10.0833 7.53182 10.0833 5.9408C10.0833 4.34978 8.79149 3.06 7.19792 3.06ZM14.4458 9.48719C14.4403 9.44986 14.4375 9.41166 14.4375 9.3728C14.4375 7.75995 13.2076 6.43389 11.6332 6.27844C11.48 8.3122 9.95487 9.96383 7.97917 10.3133V12.94H10.4271V11.2032C10.4271 10.7724 10.7769 10.4232 11.2083 10.4232C11.6398 10.4232 11.9896 10.7724 11.9896 11.2032V12.94H14.4375V9.6016C14.4375 9.56274 14.4403 9.52453 14.4458 9.48719Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 173,
    name: "prettier",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.707 1.815 C 3.450 1.931,3.282 2.167,3.260 2.442 C 3.235 2.750,3.376 3.005,3.657 3.161 L 3.800 3.240 6.000 3.240 L 8.200 3.240 8.337 3.168 C 8.614 3.022,8.765 2.750,8.740 2.442 C 8.718 2.167,8.550 1.931,8.293 1.815 C 8.176 1.762,8.128 1.761,6.000 1.761 C 3.872 1.761,3.824 1.762,3.707 1.815 M10.740 1.798 C 10.429 1.909,10.208 2.274,10.257 2.595 C 10.300 2.873,10.520 3.136,10.775 3.211 C 10.965 3.268,11.538 3.269,11.726 3.213 C 11.907 3.159,12.108 2.978,12.186 2.796 C 12.259 2.625,12.254 2.340,12.173 2.173 C 12.099 2.021,11.915 1.852,11.769 1.803 C 11.607 1.747,10.891 1.744,10.740 1.798 M3.707 5.309 C 3.110 5.578,3.102 6.402,3.693 6.683 C 3.826 6.746,3.834 6.746,4.749 6.746 L 5.671 6.747 5.835 6.665 C 6.106 6.530,6.247 6.302,6.247 6.000 C 6.247 5.698,6.106 5.470,5.835 5.335 L 5.671 5.253 4.749 5.254 C 3.880 5.254,3.820 5.258,3.707 5.309 M8.293 5.278 C 7.978 5.374,7.761 5.668,7.761 6.000 C 7.761 6.395,8.050 6.709,8.442 6.740 C 8.751 6.765,9.006 6.624,9.160 6.343 C 9.227 6.221,9.238 6.171,9.238 6.000 C 9.238 5.829,9.227 5.779,9.160 5.657 C 9.065 5.483,8.915 5.350,8.752 5.295 C 8.625 5.251,8.407 5.244,8.293 5.278 M11.237 5.296 C 11.083 5.351,10.917 5.502,10.833 5.663 C 10.774 5.776,10.761 5.835,10.761 6.000 C 10.761 6.242,10.841 6.420,11.016 6.569 C 11.224 6.748,11.243 6.750,12.550 6.741 C 13.692 6.734,13.723 6.732,13.827 6.676 C 14.085 6.536,14.239 6.284,14.239 6.000 C 14.239 5.716,14.085 5.464,13.827 5.324 C 13.722 5.268,13.695 5.267,12.533 5.262 C 11.544 5.257,11.328 5.263,11.237 5.296 M3.779 8.785 C 3.426 8.911,3.228 9.211,3.260 9.569 C 3.278 9.763,3.349 9.905,3.499 10.044 C 3.706 10.235,3.761 10.245,4.548 10.235 L 5.240 10.227 5.364 10.154 C 5.700 9.956,5.841 9.532,5.681 9.195 C 5.597 9.017,5.399 8.840,5.225 8.789 C 5.036 8.732,3.934 8.730,3.779 8.785 M7.779 8.785 C 7.426 8.911,7.228 9.211,7.260 9.569 C 7.284 9.836,7.454 10.071,7.707 10.185 C 7.824 10.237,7.874 10.239,9.735 10.239 C 11.881 10.240,11.799 10.247,12.007 10.044 C 12.163 9.893,12.222 9.758,12.235 9.531 C 12.249 9.283,12.178 9.112,11.994 8.946 C 11.765 8.740,11.835 8.747,9.735 8.748 C 8.245 8.749,7.860 8.756,7.779 8.785 M3.808 12.277 C 3.120 12.466,3.065 13.402,3.724 13.700 C 3.817 13.742,3.956 13.747,5.253 13.747 L 6.680 13.747 6.805 13.684 C 7.062 13.557,7.253 13.265,7.253 13.000 C 7.253 12.735,7.062 12.443,6.805 12.316 L 6.680 12.253 5.307 12.248 C 4.252 12.244,3.904 12.250,3.808 12.277 " stroke="none" fill="#000000" fill-rule="evenodd"></path></svg>`,
    tags: [],
  },
{
    id: 174,
    name: "prisma",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.21355 2.04328C8.11615 1.88327 7.88385 1.88327 7.78645 2.04328L2.22242 11.1842C2.14487 11.3116 2.19541 11.4781 2.33069 11.5409L7.89472 14.1242C7.96148 14.1552 8.03851 14.1552 8.10528 14.1242L13.6693 11.5409C13.8046 11.4781 13.8551 11.3116 13.7776 11.1842L8.21355 2.04328ZM6.50515 1.26336C7.18696 0.143242 8.81303 0.143239 9.49485 1.26336L15.0589 10.4043C15.6017 11.2961 15.2479 12.4618 14.301 12.9014L8.73694 15.4847C8.2696 15.7017 7.73039 15.7017 7.26305 15.4847L1.69903 12.9014C0.75207 12.4618 0.398274 11.2961 0.941122 10.4043L6.50515 1.26336Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 175,
    name: "python",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.79 1.574h3.866c.14 0 .252.11.252.246v5.186a.25.25 0 01-.252.246H6.344c-.975 0-1.766.77-1.766 1.72v1.162a.25.25 0 01-.253.243H1.867a.25.25 0 01-.253-.246V6.177a.25.25 0 01.252-.246H7.98c.418 0 .757-.33.757-.737a.747.747 0 00-.757-.738H5.537V1.82a.25.25 0 01.253-.246zm5.632 2.592V1.82c0-.95-.79-1.72-1.766-1.72H5.79c-.976 0-1.767.77-1.767 1.72v2.636H1.867C.89 4.456.1 5.226.1 6.176v3.955c0 .95.79 1.72 1.766 1.72h2.46c.085 0 .17-.006.252-.017v2.346c0 .95.79 1.72 1.766 1.72h3.866c.976 0 1.767-.77 1.767-1.72v-2.636h2.156c.976 0 1.767-.77 1.767-1.72V5.868c0-.95-.79-1.72-1.767-1.72h-2.458c-.086 0-.17.005-.253.017zm-5.33 5.974V8.994a.25.25 0 01.252-.246h3.312c.976 0 1.766-.77 1.766-1.72V5.866a.25.25 0 01.253-.243h2.458c.14 0 .253.11.253.246v3.954a.25.25 0 01-.252.246H8.02a.747.747 0 00-.757.737c0 .408.339.738.757.738h2.442v2.636a.25.25 0 01-.253.246H6.344a.25.25 0 01-.252-.246v-4.04z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 176,
    name: "r",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="nonzero" clip-rule="nonzero" d="M3.26374 4.67179C2.07437 5.39311 1.5 6.28879 1.5 7.14345C1.5 8.36796 2.72381 9.6978 5.04161 10.3828C5.43869 10.5002 5.665 10.9157 5.5471 11.3109C5.42919 11.7061 5.01172 11.9314 4.61464 11.814C2.10351 11.0719 0 9.39599 0 7.14345C0 5.56974 1.04859 4.26693 2.48322 3.39686C3.93102 2.5188 5.88335 2 8 2C11.2455 2 14.2181 3.23463 15.4369 5.22085C15.7934 5.8017 16 6.4515 16 7.14345C16 7.55573 15.6642 7.88994 15.25 7.88994C14.8358 7.88994 14.5 7.55573 14.5 7.14345C14.5 6.75669 14.3864 6.37312 14.1568 5.99904C13.3233 4.64078 10.9839 3.49296 8 3.49296C6.11258 3.49296 4.43991 3.95846 3.26374 4.67179ZM6.78227 6.27021C6.78227 5.85793 7.11806 5.52372 7.53227 5.52372H11.5081C11.5575 5.52372 11.6067 5.52858 11.6552 5.53822C12.3062 5.66782 13.4274 6.34301 13.4274 7.89962C13.4274 9.24114 12.596 10.1587 11.6854 10.2651L13.3134 12.8578C13.533 13.2074 13.4262 13.6679 13.0749 13.8864C12.7237 14.1049 12.261 13.9987 12.0414 13.6491L9.92304 10.2755H8.28227V13.2534C8.28227 13.6657 7.94649 13.9999 7.53227 13.9999C7.11806 13.9999 6.78227 13.6657 6.78227 13.2534V6.27021ZM8.28227 8.78256H11.5081C11.5027 8.78256 11.5057 8.78129 11.515 8.77736C11.5776 8.75076 11.9274 8.60222 11.9274 7.89962C11.9274 7.53065 11.8051 7.3256 11.6924 7.20625C11.5919 7.09978 11.4797 7.04213 11.41 7.01669H8.28227V8.78256Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 177,
    name: "react",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="nonzero" clip-rule="nonzero" d="M4.84989 2.37195C4.59895 2.51683 4.33488 2.91636 4.30424 3.78785C4.28968 4.20181 3.9423 4.52559 3.52835 4.51103C3.11439 4.49647 2.79061 4.1491 2.80516 3.73514C2.84273 2.66673 3.1806 1.60366 4.09989 1.07291C5.02179 0.540653 6.11484 0.782356 7.06128 1.28727C7.42674 1.48224 7.56495 1.93656 7.36998 2.30201C7.17501 2.66747 6.72069 2.80568 6.35524 2.61072C5.5818 2.1981 5.10158 2.22663 4.84989 2.37195ZM8.87139 3.67284C9.19036 3.40858 9.66315 3.45293 9.92741 3.7719C10.4818 4.44103 11.0136 5.20405 11.4963 6.04018C12.5366 7.84191 13.178 9.68785 13.3509 11.2362C13.4372 12.0091 13.4108 12.7446 13.2303 13.3754C13.0484 14.011 12.6941 14.5863 12.0999 14.9293C11.381 15.3444 10.5509 15.2855 9.79114 15.0089C9.02868 14.7313 8.24395 14.2056 7.49586 13.5228C7.18993 13.2435 7.16831 12.7691 7.44756 12.4632C7.72681 12.1573 8.20119 12.1356 8.50712 12.4149C9.16624 13.0165 9.78567 13.4105 10.3043 13.5994C10.8257 13.7892 11.1537 13.7436 11.3499 13.6303C11.5143 13.5354 11.6797 13.342 11.7882 12.9627C11.8981 12.5787 11.9328 12.0529 11.8602 11.4026C11.7152 10.1045 11.1591 8.45607 10.1973 6.79018C9.75492 6.02396 9.27081 5.33055 8.77232 4.72886C8.50807 4.40989 8.55242 3.93709 8.87139 3.67284Z" fill="#000000"/>
<path fill-rule="nonzero" clip-rule="nonzero" d="M14.5 8.20557C14.5 7.91581 14.286 7.48735 13.5466 7.02507C13.1954 6.80549 13.0887 6.34276 13.3083 5.99154C13.5279 5.64032 13.9906 5.53361 14.3418 5.75319C15.2483 6.31993 16 7.14407 16 8.20557C16 9.27009 15.2442 10.0958 14.3337 10.663C13.9821 10.882 13.5195 10.7746 13.3005 10.423C13.0815 10.0714 13.189 9.60887 13.5405 9.38985C14.2846 8.92635 14.5 8.4962 14.5 8.20557ZM11.3626 11.0378C11.432 11.4462 11.1572 11.8335 10.7488 11.9029C9.89219 12.0484 8.96547 12.1274 8 12.1274C5.91954 12.1274 4.00018 11.76 2.57286 11.1355C1.86032 10.8238 1.23659 10.4332 0.780529 9.9615C0.320977 9.48616 0 8.89166 0 8.20557C0 7.37549 0.466082 6.68599 1.08548 6.16636C1.70712 5.64485 2.55471 5.22808 3.52013 4.92164C3.91494 4.79633 4.33657 5.01479 4.46189 5.40959C4.5872 5.80439 4.36874 6.22603 3.97394 6.35135C3.12334 6.62134 2.4724 6.96078 2.04954 7.31553C1.62442 7.67217 1.5 7.97899 1.5 8.20557C1.5 8.39536 1.58476 8.6353 1.85895 8.91891C2.13663 9.20613 2.57464 9.49905 3.17409 9.76131C4.37076 10.2848 6.07639 10.6274 8 10.6274C8.88475 10.6274 9.72732 10.5549 10.4976 10.424C10.906 10.3547 11.2933 10.6295 11.3626 11.0378Z" fill="#000000"/>
<path fill-rule="nonzero" clip-rule="nonzero" d="M4.87192 13.6303C5.12286 13.7752 5.6009 13.8041 6.37095 13.3949C6.73673 13.2005 7.19082 13.3395 7.38519 13.7052C7.57957 14.071 7.44062 14.5251 7.07484 14.7195C6.13079 15.2211 5.04121 15.4601 4.12192 14.9293C3.20003 14.3971 2.86282 13.3296 2.82687 12.2575C2.81299 11.8435 3.13733 11.4967 3.55131 11.4828C3.96529 11.4689 4.31215 11.7932 4.32603 12.2072C4.35541 13.0834 4.62023 13.485 4.87192 13.6303ZM3.98778 9.49712C3.59944 9.35301 3.40145 8.92138 3.54556 8.53304C3.84786 7.71839 4.24274 6.8763 4.72548 6.04018C5.76571 4.23845 7.04361 2.75996 8.29806 1.83609C8.92431 1.37487 9.57441 1.02999 10.211 0.870901C10.8524 0.71059 11.5278 0.729863 12.1219 1.07291C12.8408 1.48795 13.2049 2.23634 13.3452 3.03257C13.486 3.83168 13.4232 4.77409 13.2058 5.7634C13.1169 6.16796 12.7169 6.42388 12.3124 6.33501C11.9078 6.24613 11.6519 5.84612 11.7408 5.44155C11.9322 4.56992 11.9637 3.83647 11.868 3.29288C11.7717 2.7464 11.5681 2.48524 11.3719 2.37195C11.2076 2.27705 10.9574 2.23049 10.5747 2.32614C10.1871 2.42301 9.71442 2.65588 9.18757 3.04388C8.13584 3.81846 6.98632 5.12428 6.02452 6.79018C5.58214 7.55639 5.22369 8.32235 4.95185 9.0549C4.80774 9.44323 4.37611 9.64122 3.98778 9.49712Z" fill="#000000"/>
<path d="M9.45925 8.06618C9.45925 8.81694 8.85063 9.42556 8.09987 9.42556C7.34911 9.42556 6.7405 8.81694 6.7405 8.06618C6.7405 7.31542 7.34911 6.70681 8.09987 6.70681C8.85063 6.70681 9.45925 7.31542 9.45925 8.06618Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 178,
    name: "rust",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 .1c.422 0 .765.342.765.765v.916c.296.035.587.091.87.166l.283-.683a.764.764 0 111.413.585l-.276.665c.287.157.56.335.817.533l.633-.633a.765.765 0 011.081 1.081l-.62.62c.24.298.453.618.637.956l.631-.261a.765.765 0 11.585 1.413l-.654.27c.072.277.126.56.16.849h.81a.765.765 0 010 1.529h-.81a6.334 6.334 0 01-.21 1.027l.664.275a.765.765 0 11-.585 1.413l-.672-.278c-.13.24-.278.471-.44.693l.504.504a.765.765 0 01-1.081 1.081l-.465-.465c-.3.253-.627.48-.978.677l.269.65a.765.765 0 11-1.413.586l-.27-.65a6.332 6.332 0 01-.883.181v.57a.765.765 0 01-1.53 0v-.555a6.386 6.386 0 01-1.087-.218l-.278.672a.765.765 0 11-1.413-.585l.285-.688a6.38 6.38 0 01-.84-.581l-.407.406a.765.765 0 01-1.081-1.081l.428-.428a6.348 6.348 0 01-.459-.703l-.748.31a.765.765 0 01-.585-1.413l.748-.31a6.339 6.339 0 01-.205-1.09H.865a.765.765 0 010-1.53h.762c.044-.298.108-.593.192-.88l-.81-.336a.765.765 0 01.585-1.413l.815.337c.181-.33.39-.643.625-.934l-.62-.62a.765.765 0 011.081-1.081l.633.633c.205-.158.42-.303.645-.435l-.316-.763a.765.765 0 011.413-.585L6.175 2a6.34 6.34 0 011.06-.22V.865C7.235.442 7.578.1 8 .1zm-.765 3.354a4.854 4.854 0 00-3.487 2.36l.61.199a.765.765 0 11-.472 1.454l-.653-.212a4.823 4.823 0 001.294 4.225l.458-.63a.764.764 0 011.237.898l-.47.648A4.818 4.818 0 008 12.948c.812 0 1.577-.2 2.249-.552l-.352-.484a.765.765 0 011.237-.899l.34.467c.349-.36.642-.773.867-1.227a4.843 4.843 0 00.34-2.97l-.567.184a.764.764 0 11-.472-1.454l.5-.163a4.827 4.827 0 00-3.377-2.374v.447a.765.765 0 11-1.53 0v-.469z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 179,
    name: "scala",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="nonzero" clip-rule="nonzero" d="M12.7116 0.261121C12.8936 0.405276 13 0.626454 13 0.860694V12.984C13 13.3331 12.7658 13.6374 12.4319 13.722L3.9319 15.8773C3.70785 15.9341 3.47048 15.883 3.28844 15.7389C3.1064 15.5947 3 15.3736 3 15.1393V3.01595C3 2.6669 3.23422 2.36264 3.5681 2.27798L12.0681 0.122725C12.2922 0.0659134 12.5295 0.116967 12.7116 0.261121ZM4.5 3.60987V5.93326L11.5 4.0474V1.83496L4.5 3.60987ZM11.5 5.62152L4.5 7.50738V10.1239L11.5 8.34901V5.62152ZM11.5 9.9172L4.5 11.6921V14.1651L11.5 12.3901V9.9172Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 180,
    name: "snippet",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 4C1.5 3.0335 2.2835 2.25 3.25 2.25H13.25C14.2165 2.25 15 3.0335 15 4V10.5C15 10.9142 14.6642 11.25 14.25 11.25C13.8358 11.25 13.5 10.9142 13.5 10.5V4C13.5 3.86193 13.3881 3.75 13.25 3.75H3.25C3.11193 3.75 3 3.86193 3 4V10.5C3 10.9142 2.66421 11.25 2.25 11.25C1.83579 11.25 1.5 10.9142 1.5 10.5V4Z" fill="#000000"/>
<path d="M2.25 13.5C2.66421 13.5 3 13.1642 3 12.75C3 12.3358 2.66421 12 2.25 12C1.83579 12 1.5 12.3358 1.5 12.75C1.5 13.1642 1.83579 13.5 2.25 13.5Z" fill="#000000"/>
<path d="M14.25 13.5C14.6642 13.5 15 13.1642 15 12.75C15 12.3358 14.6642 12 14.25 12C13.8358 12 13.5 12.3358 13.5 12.75C13.5 13.1642 13.8358 13.5 14.25 13.5Z" fill="#000000"/>
<path d="M11.25 13.5C11.6642 13.5 12 13.1642 12 12.75C12 12.3358 11.6642 12 11.25 12C10.8358 12 10.5 12.3358 10.5 12.75C10.5 13.1642 10.8358 13.5 11.25 13.5Z" fill="#000000"/>
<path d="M5.25 13.5C5.66421 13.5 6 13.1642 6 12.75C6 12.3358 5.66421 12 5.25 12C4.83579 12 4.5 12.3358 4.5 12.75C4.5 13.1642 4.83579 13.5 5.25 13.5Z" fill="#000000"/>
<path d="M8.25 13.5C8.66421 13.5 9 13.1642 9 12.75C9 12.3358 8.66421 12 8.25 12C7.83579 12 7.5 12.3358 7.5 12.75C7.5 13.1642 7.83579 13.5 8.25 13.5Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 181,
    name: "struct",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 2C0 0.895431 0.895431 0 2 0H14C15.1046 0 16 0.895431 16 2V6C16 7.10457 15.1046 8 14 8H2C0.89543 8 0 7.10457 0 6V2ZM2 1.71429C1.8422 1.71429 1.71429 1.8422 1.71429 2V6C1.71429 6.1578 1.8422 6.28571 2 6.28571H14C14.1578 6.28571 14.2857 6.1578 14.2857 6V2C14.2857 1.8422 14.1578 1.71429 14 1.71429H2ZM0 11.1429C0 10.0383 0.895431 9.14286 2 9.14286H4.85714C5.96171 9.14286 6.85714 10.0383 6.85714 11.1429V14C6.85714 15.1046 5.96171 16 4.85714 16H2C0.89543 16 0 15.1046 0 14V11.1429ZM2 10.8571C1.8422 10.8571 1.71429 10.9851 1.71429 11.1429V14C1.71429 14.1578 1.8422 14.2857 2 14.2857H4.85714C5.01494 14.2857 5.14286 14.1578 5.14286 14V11.1429C5.14286 10.9851 5.01494 10.8571 4.85714 10.8571H2ZM9.14286 11.1429C9.14286 10.0383 10.0383 9.14286 11.1429 9.14286H14C15.1046 9.14286 16 10.0383 16 11.1429V14C16 15.1046 15.1046 16 14 16H11.1429C10.0383 16 9.14286 15.1046 9.14286 14V11.1429ZM11.1429 10.8571C10.9851 10.8571 10.8571 10.9851 10.8571 11.1429V14C10.8571 14.1578 10.9851 14.2857 11.1429 14.2857H14C14.1578 14.2857 14.2857 14.1578 14.2857 14V11.1429C14.2857 10.9851 14.1578 10.8571 14 10.8571H11.1429Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 182,
    name: "svelte",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.438 2.94656C13.0222 3.84625 13.0826 4.82176 12.784 5.56064C12.2332 5.04017 11.5732 4.66735 10.8806 4.48388C10.8888 4.33095 10.8504 4.17412 10.7606 4.03584C10.535 3.68845 10.0705 3.58972 9.72314 3.81532L8.0472 4.90369C8.04673 4.90399 8.04627 4.90429 8.0458 4.9046L5.52979 6.53851C5.1824 6.76411 5.08367 7.22861 5.30926 7.57599C5.53486 7.92338 5.99936 8.02212 6.34675 7.79652L8.86347 6.16214C8.86323 6.16229 8.86371 6.16198 8.86347 6.16214C9.81822 5.54278 11.3592 5.87563 12.2475 7.24351C13.1361 8.61173 12.813 10.1553 11.8583 10.7753L6.82625 14.0431C5.87156 14.6631 4.33001 14.3304 3.44148 12.9622C2.85722 12.0625 2.79684 11.087 3.09545 10.3481C3.64623 10.8686 4.30624 11.2414 4.99882 11.4249C4.99062 11.5778 5.02903 11.7347 5.11882 11.8729C5.34442 12.2203 5.80892 12.3191 6.15631 12.0935L10.3497 9.37027C10.697 9.14467 10.7958 8.68017 10.5702 8.33279C10.3446 7.9854 9.88009 7.88666 9.5327 8.11226L7.01644 9.74634C7.01652 9.74629 7.01635 9.7464 7.01644 9.74634C6.06172 10.3661 4.52038 10.0334 3.63192 8.66527C2.74339 7.29705 3.06648 5.75348 4.02117 5.13349L9.0532 1.86566C10.0079 1.24567 11.5494 1.57834 12.438 2.94656ZM13.7667 6.88194C14.7218 5.56301 14.6705 3.63028 13.696 2.1296C12.4789 0.255528 10.0607 -0.577139 8.23624 0.607651L3.20422 3.87549C1.52381 4.96675 1.20205 7.21441 2.11271 9.02685C1.15769 10.3458 1.20893 12.2785 2.18348 13.7792C3.40052 15.6533 5.81879 16.4859 7.64321 15.3011L12.6752 12.0333C14.3556 10.942 14.6774 8.69437 13.7667 6.88194Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 183,
    name: "swift",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="nonzero" clip-rule="nonzero" d="M6.15406 0.318048C6.44683 0.608782 6.44683 1.08015 6.15407 1.37089C5.35589 2.16353 4.82154 3.76847 4.65102 5.49284C4.56806 6.33176 4.57668 7.14971 4.66581 7.83797C4.6911 8.03331 4.72208 8.21183 4.75725 8.37317L9.73184 3.43309C10.0246 3.14236 10.4993 3.14236 10.792 3.43309C11.0848 3.72383 11.0848 4.1952 10.792 4.48594L5.00684 10.231C4.84911 10.3876 4.62933 10.4664 4.40724 10.4458C4.18513 10.4253 3.98378 10.3076 3.85788 10.1248C3.48757 9.58689 3.28124 8.81967 3.17871 8.02788C3.07328 7.21371 3.0664 6.28216 3.15885 5.34732C3.18162 5.11706 3.21077 4.88335 3.24668 4.64837C2.8927 5.13977 2.56919 5.65077 2.30317 6.17223C1.82762 7.10439 1.56367 8.01827 1.60326 8.87652C1.64181 9.71235 1.97009 10.5558 2.79485 11.3748C2.99362 11.5722 3.06449 11.8634 2.97842 12.1292L2.58792 13.3348L3.80184 12.9469C4.06948 12.8613 4.3628 12.9317 4.5616 13.1291C5.44507 14.0065 6.32135 14.3551 7.16176 14.4047C8.02229 14.4555 8.92356 14.1968 9.8405 13.7206C10.3796 13.4407 10.905 13.0962 11.4094 12.7186C11.1483 12.7607 10.8882 12.7943 10.6319 12.8199C9.69576 12.9131 8.76147 12.9041 7.93874 12.7922C7.13468 12.6828 6.36013 12.4649 5.80472 12.0833C5.62187 11.9577 5.5046 11.758 5.48459 11.5381C5.46459 11.3182 5.54391 11.1008 5.70113 10.9447L11.4985 5.1875C11.7913 4.89677 12.2659 4.89677 12.5587 5.1875C12.8515 5.47824 12.8515 5.94961 12.5587 6.24035L7.55477 11.2096C7.7312 11.2513 7.92726 11.2878 8.14229 11.317C8.83268 11.411 9.64728 11.4215 10.4823 11.3383C12.1927 11.1679 13.7957 10.626 14.6189 9.80965C14.6193 9.80921 14.6198 9.80876 14.6202 9.80832C14.913 9.51759 15.3877 9.51759 15.6804 9.80832C15.9732 10.0991 15.9732 10.5704 15.6804 10.8612C15.6143 10.9268 15.5461 10.9948 15.4758 11.0648C14.2922 12.2437 12.5192 14.0097 10.5353 15.04C9.4732 15.5916 8.29588 15.9632 7.07278 15.891C5.95452 15.825 4.8612 15.3915 3.84069 14.4986L1.65662 15.1966C1.38901 15.2821 1.09571 15.2118 0.896904 15.0144C0.6981 14.817 0.627213 14.5257 0.713291 14.26L1.41641 12.0891C0.559921 11.1105 0.156087 10.0419 0.10548 8.94465C0.0500065 7.74189 0.421143 6.56671 0.965671 5.49933C2.04701 3.3797 3.92158 1.48222 5.09294 0.318973C5.09325 0.318665 5.09356 0.318358 5.09387 0.31805C5.38663 0.0273153 5.8613 0.0273146 6.15406 0.318048Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 184,
    name: "template",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.547 0.309 C 1.258 0.384,1.016 0.529,0.773 0.773 C 0.524 1.022,0.416 1.198,0.316 1.520 L 0.253 1.720 0.253 8.000 L 0.253 14.280 0.316 14.480 C 0.416 14.802,0.524 14.978,0.773 15.227 C 1.022 15.476,1.198 15.584,1.520 15.684 L 1.720 15.747 8.000 15.747 L 14.280 15.747 14.480 15.684 C 14.802 15.584,14.978 15.476,15.227 15.227 C 15.476 14.978,15.584 14.802,15.684 14.480 L 15.747 14.280 15.747 8.000 L 15.747 1.720 15.684 1.520 C 15.584 1.198,15.476 1.022,15.227 0.773 C 14.980 0.525,14.739 0.382,14.441 0.307 C 14.207 0.248,1.774 0.249,1.547 0.309 M14.170 1.830 L 14.240 1.901 14.240 8.000 L 14.240 14.099 14.173 14.166 C 14.136 14.203,14.069 14.241,14.023 14.250 C 13.915 14.272,2.085 14.272,1.977 14.250 C 1.931 14.241,1.864 14.203,1.827 14.166 L 1.760 14.099 1.760 8.000 L 1.760 1.901 1.830 1.830 L 1.901 1.760 8.000 1.760 L 14.099 1.760 14.170 1.830 " stroke="none" fill-rule="evenodd" fill="#000000"></path></svg>`,
    tags: [],
  },
{
    id: 185,
    name: "terraform",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.429 0.044 C 0.803 0.178,0.308 0.620,0.089 1.240 L 0.013 1.453 0.006 3.200 C -0.003 5.168,-0.001 5.200,0.187 5.587 C 0.305 5.831,0.458 6.025,0.662 6.191 C 0.739 6.255,1.657 6.782,2.702 7.362 L 4.600 8.418 4.615 10.722 C 4.629 12.791,4.635 13.044,4.676 13.200 C 4.778 13.582,5.019 13.955,5.307 14.177 C 5.452 14.288,7.892 15.658,8.254 15.831 C 8.518 15.957,8.784 16.009,9.080 15.991 C 9.537 15.965,9.946 15.783,10.265 15.465 C 10.473 15.257,10.615 15.025,10.714 14.733 L 10.786 14.520 10.795 12.747 L 10.804 10.973 12.686 9.827 C 13.721 9.196,14.635 8.629,14.717 8.566 C 14.919 8.412,15.101 8.189,15.226 7.941 C 15.415 7.566,15.417 7.543,15.408 5.787 L 15.400 4.227 15.325 4.014 C 15.087 3.342,14.528 2.889,13.825 2.800 C 13.582 2.769,13.263 2.805,13.031 2.889 C 12.940 2.922,12.234 3.300,11.463 3.728 C 10.692 4.156,10.049 4.507,10.034 4.507 C 10.020 4.507,8.371 3.552,6.370 2.384 C 4.370 1.217,2.664 0.227,2.580 0.184 C 2.251 0.016,1.808 -0.037,1.429 0.044 M3.240 2.344 L 4.600 3.139 4.607 4.893 C 4.613 6.524,4.611 6.645,4.569 6.629 C 4.434 6.577,1.632 5.002,1.593 4.956 C 1.550 4.905,1.547 4.786,1.547 3.302 L 1.547 1.703 1.625 1.625 C 1.680 1.569,1.728 1.547,1.791 1.548 C 1.858 1.549,2.213 1.744,3.240 2.344 M7.769 4.986 L 9.253 5.853 9.253 7.540 C 9.253 8.468,9.249 9.227,9.244 9.227 C 9.239 9.227,8.546 8.844,7.704 8.377 L 6.173 7.527 6.166 5.789 L 6.160 4.051 6.223 4.086 C 6.257 4.105,6.953 4.510,7.769 4.986 M13.734 4.360 C 13.777 4.382,13.824 4.424,13.839 4.452 C 13.857 4.485,13.867 4.985,13.867 5.875 C 13.867 7.144,13.863 7.252,13.820 7.302 C 13.794 7.332,13.149 7.737,12.387 8.202 C 11.624 8.667,10.955 9.076,10.900 9.111 L 10.800 9.174 10.801 7.514 L 10.802 5.853 12.005 5.187 C 13.777 4.205,13.598 4.290,13.734 4.360 M7.726 10.153 L 9.252 11.000 9.253 12.621 C 9.253 14.033,9.248 14.253,9.212 14.322 C 9.170 14.403,9.082 14.453,8.981 14.453 C 8.921 14.453,6.349 13.036,6.241 12.942 L 6.173 12.885 6.166 11.096 C 6.162 10.112,6.168 9.307,6.179 9.307 C 6.190 9.307,6.886 9.688,7.726 10.153 " stroke="none" fill="#000000" fill-rule="evenodd"></path></svg>`,
    tags: [],
  },
{
    id: 186,
    name: "tmux",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="nonzero" clip-rule="nonzero" d="M1.75 1.5C1.61193 1.5 1.5 1.61193 1.5 1.75V14.25C1.5 14.3881 1.61193 14.5 1.75 14.5H7.25V1.5H1.75ZM8.75 1.5V7.25H14.5V1.75C14.5 1.61193 14.3881 1.5 14.25 1.5H8.75ZM14.5 8.75H8.75V14.5H14.25C14.3881 14.5 14.5 14.3881 14.5 14.25V8.75ZM0 1.75C0 0.783501 0.783502 0 1.75 0H14.25C15.2165 0 16 0.783502 16 1.75V14.25C16 15.2165 15.2165 16 14.25 16H1.75C0.783502 16 0 15.2165 0 14.25V1.75Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 187,
    name: "toml",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="nonzero" clip-rule="nonzero" d="M0 0.774194C0 0.346618 0.346618 0 0.774194 0H4.3871C4.81467 0 5.16129 0.346618 5.16129 0.774194C5.16129 1.20177 4.81467 1.54839 4.3871 1.54839H1.54839V14.4516H4.3871C4.81467 14.4516 5.16129 14.7982 5.16129 15.2258C5.16129 15.6534 4.81467 16 4.3871 16H0.774194C0.346618 16 0 15.6534 0 15.2258V0.774194ZM10.8387 0.774194C10.8387 0.346618 11.1853 0 11.6129 0H15.2258C15.6534 0 16 0.346618 16 0.774194V15.2258C16 15.6534 15.6534 16 15.2258 16H11.6129C11.1853 16 10.8387 15.6534 10.8387 15.2258C10.8387 14.7982 11.1853 14.4516 11.6129 14.4516H14.4516V1.54839H11.6129C11.1853 1.54839 10.8387 1.20177 10.8387 0.774194ZM4.12903 4.90323C4.12903 4.47565 4.47565 4.12903 4.90323 4.12903H11.0968C11.5243 4.12903 11.871 4.47565 11.871 4.90323C11.871 5.3308 11.5243 5.67742 11.0968 5.67742H8.77419V13.1613C8.77419 13.5889 8.42758 13.9355 8 13.9355C7.57242 13.9355 7.22581 13.5889 7.22581 13.1613V5.67742H4.90323C4.47565 5.67742 4.12903 5.3308 4.12903 4.90323Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 188,
    name: "type",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.12903 3.77419C4.12903 3.34662 4.47565 3 4.90323 3H11.0968C11.5243 3 11.871 3.34662 11.871 3.77419C11.871 4.20177 11.5243 4.54839 11.0968 4.54839H8.77419V12.0323C8.77419 12.4598 8.42758 12.8065 8 12.8065C7.57242 12.8065 7.22581 12.4598 7.22581 12.0323V4.54839H4.90323C4.47565 4.54839 4.12903 4.20177 4.12903 3.77419ZM3.38615 5.29127C3.68849 5.59361 3.68849 6.08381 3.38615 6.38615L1.86907 7.90323L3.38615 9.4203C3.68849 9.72265 3.68849 10.2128 3.38615 10.5152C3.08381 10.8175 2.59361 10.8175 2.29127 10.5152L0.226756 8.45066C-0.0755853 8.14832 -0.0755853 7.65813 0.226756 7.35579L2.29127 5.29127C2.59361 4.98893 3.08381 4.98893 3.38615 5.29127ZM12.6139 5.29127C12.9162 4.98893 13.4064 4.98893 13.7087 5.29127L15.7732 7.35579C16.0756 7.65813 16.0756 8.14832 15.7732 8.45066L13.7087 10.5152C13.4064 10.8175 12.9162 10.8175 12.6139 10.5152C12.3115 10.2128 12.3115 9.72265 12.6139 9.4203L14.1309 7.90323L12.6139 6.38615C12.3115 6.08381 12.3115 5.59361 12.6139 5.29127Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 189,
    name: "typescript",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="nonzero" clip-rule="nonzero" d="M0 1.75C0 0.783501 0.783502 0 1.75 0H14.25C15.2165 0 16 0.783502 16 1.75V3.75C16 4.16421 15.6642 4.5 15.25 4.5C14.8358 4.5 14.5 4.16421 14.5 3.75V1.75C14.5 1.61193 14.3881 1.5 14.25 1.5H1.75C1.61193 1.5 1.5 1.61193 1.5 1.75V14.25C1.5 14.3881 1.61193 14.5 1.75 14.5H15.25C15.6642 14.5 16 14.8358 16 15.25C16 15.6642 15.6642 16 15.25 16H1.75C0.783501 16 0 15.2165 0 14.25V1.75ZM4.75 6.5C4.75 6.08579 5.08579 5.75 5.5 5.75H9.25C9.66421 5.75 10 6.08579 10 6.5C10 6.91421 9.66421 7.25 9.25 7.25H8.25V12.5C8.25 12.9142 7.91421 13.25 7.5 13.25C7.08579 13.25 6.75 12.9142 6.75 12.5V7.25H5.5C5.08579 7.25 4.75 6.91421 4.75 6.5ZM11.2757 6.58011C11.6944 6.08164 12.3507 5.75 13.25 5.75C14.0849 5.75 14.7148 6.03567 15.1394 6.48481C15.4239 6.78583 15.4105 7.26052 15.1095 7.54505C14.8085 7.82958 14.3338 7.81621 14.0493 7.51519C13.9394 7.39898 13.7204 7.25 13.25 7.25C12.7493 7.25 12.5306 7.41836 12.4243 7.54489C12.2934 7.70065 12.25 7.896 12.25 8C12.25 8.104 12.2934 8.29935 12.4243 8.45511C12.5306 8.58164 12.7493 8.75 13.25 8.75C13.3257 8.75 13.3988 8.76121 13.4676 8.78207C14.1307 8.87646 14.6319 9.17251 14.9743 9.58011C15.3684 10.0493 15.5 10.604 15.5 11C15.5 11.396 15.3684 11.9507 14.9743 12.4199C14.5556 12.9184 13.8993 13.25 13 13.25C12.1651 13.25 11.5352 12.9643 11.1106 12.5152C10.8261 12.2142 10.8395 11.7395 11.1405 11.4549C11.4415 11.1704 11.9162 11.1838 12.2007 11.4848C12.3106 11.601 12.5296 11.75 13 11.75C13.5007 11.75 13.7194 11.5816 13.8257 11.4551C13.9566 11.2993 14 11.104 14 11C14 10.896 13.9566 10.7007 13.8257 10.5449C13.7194 10.4184 13.5007 10.25 13 10.25C12.9243 10.25 12.8512 10.2388 12.7824 10.2179C12.1193 10.1235 11.6181 9.82749 11.2757 9.41989C10.8816 8.95065 10.75 8.396 10.75 8C10.75 7.604 10.8816 7.04935 11.2757 6.58011Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 190,
    name: "variable",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.03431 2.23431C5.34673 1.9219 5.85327 1.9219 6.16569 2.23431L10.4 6.46863L14.6343 2.23431C14.9467 1.9219 15.4533 1.9219 15.7657 2.23431C16.0781 2.54673 16.0781 3.05327 15.7657 3.36569L10.9657 8.16569C10.6533 8.4781 10.1467 8.4781 9.83432 8.16569L5.6 3.93137L1.36569 8.16569C1.05327 8.4781 0.546734 8.4781 0.234315 8.16569C-0.0781048 7.85327 -0.0781048 7.34673 0.234315 7.03431L5.03431 2.23431ZM1.6 12.6667V11.3333C1.6 10.8915 1.24183 10.5333 0.8 10.5333C0.358172 10.5333 0 10.8915 0 11.3333V14.2667H16V11.3333C16 10.8915 15.6418 10.5333 15.2 10.5333C14.7582 10.5333 14.4 10.8915 14.4 11.3333V12.6667H11.2V11.3333C11.2 10.8915 10.8418 10.5333 10.4 10.5333C9.95817 10.5333 9.6 10.8915 9.6 11.3333V12.6667H6.4V11.3333C6.4 10.8915 6.04183 10.5333 5.6 10.5333C5.15817 10.5333 4.8 10.8915 4.8 11.3333V12.6667H1.6Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 191,
    name: "vim",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="nonzero" clip-rule="nonzero" d="M0 0.786012C0 0.351909 0.335786 0 0.75 0H6.55508C6.9693 0 7.30508 0.351909 7.30508 0.786012V3.93006C7.30508 4.35524 6.98295 4.70158 6.58051 4.71563V6.09604L8.55754 4.23253C8.52047 4.13942 8.5 4.03725 8.5 3.93006V0.786012C8.5 0.351909 8.83579 0 9.25 0H15.25C15.6642 0 16 0.351909 16 0.786012V3.93006C16 4.1486 15.9132 4.35728 15.7604 4.506L4.16716 15.7899C4.02844 15.925 3.84611 16 3.65678 16H2.20763C2.05956 16 1.9148 15.9541 1.7916 15.868L1.06703 15.3617C0.858377 15.216 0.733051 14.9705 0.733051 14.7077V4.71587C0.326665 4.70643 0 4.35822 0 3.93006V0.786012ZM1.5 3.14424C1.90639 3.15369 2.23305 3.50189 2.23305 3.93006V14.2871L2.43471 14.428H3.36223L14.5 3.58734V1.57202H10V3.14405C10.3106 3.14405 10.589 3.34467 10.7003 3.64858C10.8115 3.95249 10.7325 4.29681 10.5015 4.51447L6.33204 8.44453C6.11186 8.65207 5.79577 8.7044 5.52526 8.57808C5.25476 8.45177 5.08051 8.17047 5.08051 7.86012V3.93006C5.08051 3.50487 5.40264 3.15854 5.80508 3.14449V1.57202H1.5V3.14424Z" fill="#000000"/>
</svg>`,
    tags: [],
  },
{
    id: 192,
    name: "vim-replace-mode",
    category: "",
    svg: `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="nonzero" clip-rule="nonzero" d="M0 1.75C0 0.783501 0.783502 0 1.75 0H14.25C15.2165 0 16 0.783502 16 1.75V14.25C16 15.2165 15.2165 16 14.25 16H1.75C0.783501 16 0 15.2165 0 14.25V1.75ZM1.75 1.5C1.61193 1.5 1.5 1.61193 1.5 1.75V14.25C1.5 14.3881 1.61193 14.5 1.75 14.5H14.25C14.3881 14.5 14.5 14.3881 14.5 14.25V1.75C14.5 1.61193 14.3881 1.5 14.25 1.5H1.75ZM4.25 4C4.25 3.58579 4.58579 3.25 5 3.25H8.6C10.1188 3.25 11.35 4.48122 11.35 6C11.35 7.31438 10.4279 8.41339 9.19527 8.6854L11.2144 11.5699C11.452 11.9092 11.3694 12.3769 11.0301 12.6144C10.6908 12.852 10.2231 12.7694 9.98558 12.4301L7.40951 8.75H5.75V12C5.75 12.4142 5.41421 12.75 5 12.75C4.58579 12.75 4.25 12.4142 4.25 12V4ZM5.75 7.25H8.6C9.29036 7.25 9.85 6.69036 9.85 6C9.85 5.30964 9.29036 4.75 8.6 4.75H5.75V7.25Z" fill="#000000"/>
</svg>`,
    tags: [],
  }
  
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
