"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "@/app/components/ui/icons";

interface ArchNode {
  id: string;
  name: string;
  layer: string;
  tier: number; // 0: Edge, 1: Gateway, 2: Services, 3: Event Bus, 4: Data
  x: number;
  y: number;
  z: number;
  color: string;
  accent: string;
  latency: string;
  throughput: string;
  cpu: string;
  status: "Healthy" | "Active" | "Streaming";
  spec: string;
  tags: string[];
}

const ARCH_NODES: ArchNode[] = [
  // Tier 0: Client & Edge
  {
    id: "edge-gateway",
    name: "Edge Routing & WAF",
    layer: "Client & Ingress Edge",
    tier: 0,
    x: 0,
    y: -140,
    z: -30,
    color: "#3b82f6",
    accent: "#60a5fa",
    latency: "4ms",
    throughput: "42.8k req/s",
    cpu: "24%",
    status: "Healthy",
    spec: "Global Cloudflare Worker & Anycast Edge Mesh with DDoS filtration",
    tags: ["Anycast", "TLS 1.3", "Geo-Routing"],
  },
  // Tier 1: API & Security Mesh
  {
    id: "graphql-gateway",
    name: "GraphQL Federation Mesh",
    layer: "API Gateway & Security",
    tier: 1,
    x: -90,
    y: -70,
    z: 10,
    color: "#0022ff",
    accent: "#38bdf8",
    latency: "9ms",
    throughput: "28.4k req/s",
    cpu: "41%",
    status: "Healthy",
    spec: "Apollo Subgraph Federation with declarative schema stitching & JWT auth",
    tags: ["Subgraphs", "Envoy Proxy", "JWT RBAC"],
  },
  {
    id: "auth-guard",
    name: "Zero-Trust RBAC & IAM",
    layer: "API Gateway & Security",
    tier: 1,
    x: 90,
    y: -70,
    z: -10,
    color: "#6366f1",
    accent: "#818cf8",
    latency: "6ms",
    throughput: "19.5k req/s",
    cpu: "18%",
    status: "Healthy",
    spec: "Fine-grained enterprise attribute-based authorization (ABAC/RBAC) engine",
    tags: ["OAuth2", "PKCE", "Session Vault"],
  },
  // Tier 2: Microservices Layer
  {
    id: "workflow-engine",
    name: "Business Workflow Engine",
    layer: "Core Domain Microservices",
    tier: 2,
    x: -120,
    y: 10,
    z: 40,
    color: "#0284c7",
    accent: "#38bdf8",
    latency: "14ms",
    throughput: "14.2k req/s",
    cpu: "52%",
    status: "Active",
    spec: "State machine orchestrator managing complex approval and underwriting trees",
    tags: ["Statecharts", "Idempotent", "Temporal"],
  },
  {
    id: "ledger-engine",
    name: "Financial Transaction Ledger",
    layer: "Core Domain Microservices",
    tier: 2,
    x: 0,
    y: 10,
    z: 0,
    color: "#0022ff",
    accent: "#93c5fd",
    latency: "11ms",
    throughput: "18.9k req/s",
    cpu: "47%",
    status: "Active",
    spec: "Double-entry cryptographic ledger guaranteeing immutable financial consistency",
    tags: ["Double-Entry", "ACID", "Audit Trail"],
  },
  {
    id: "notification-broker",
    name: "Multi-Channel Dispatcher",
    layer: "Core Domain Microservices",
    tier: 2,
    x: 120,
    y: 10,
    z: -40,
    color: "#8b5cf6",
    accent: "#c084fc",
    latency: "8ms",
    throughput: "8.6k req/s",
    cpu: "21%",
    status: "Active",
    spec: "WebSocket, Webhook & WhatsApp automated template dispatcher queue",
    tags: ["WebSockets", "BullMQ", "Dead-Letter"],
  },
  // Tier 3: Event Bus
  {
    id: "event-stream",
    name: "Distributed Event Bus",
    layer: "Asynchronous Event Fabric",
    tier: 3,
    x: 0,
    y: 85,
    z: 15,
    color: "#10b981",
    accent: "#34d399",
    latency: "2ms",
    throughput: "89.4k msg/s",
    cpu: "34%",
    status: "Streaming",
    spec: "High-throughput partitioned Kafka & Redis PubSub event streams",
    tags: ["Kafka", "Redis Streams", "Zero-Loss"],
  },
  // Tier 4: Data Layer
  {
    id: "pg-cluster",
    name: "Sharded PostgreSQL Cluster",
    layer: "Persistence & Vault Storage",
    tier: 4,
    x: -85,
    y: 155,
    z: 30,
    color: "#0f766e",
    accent: "#2dd4bf",
    latency: "5ms",
    throughput: "16.1k qps",
    cpu: "39%",
    status: "Healthy",
    spec: "Multi-region distributed PostgreSQL cluster with write primaries & read replicas",
    tags: ["Multi-AZ", "Connection Pool", "WAL Sync"],
  },
  {
    id: "cache-layer",
    name: "Redis Enterprise Cache",
    layer: "Persistence & Vault Storage",
    tier: 4,
    x: 85,
    y: 155,
    z: -30,
    color: "#f43f5e",
    accent: "#fb7185",
    latency: "1ms",
    throughput: "64.5k ops/s",
    cpu: "28%",
    status: "Healthy",
    spec: "In-memory sub-millisecond query cache & distributed distributed locking cluster",
    tags: ["Sub-ms", "Cluster Mode", "Redlock"],
  },
];

const ARCH_EDGES = [
  ["edge-gateway", "graphql-gateway"],
  ["edge-gateway", "auth-guard"],
  ["graphql-gateway", "workflow-engine"],
  ["graphql-gateway", "ledger-engine"],
  ["graphql-gateway", "notification-broker"],
  ["auth-guard", "workflow-engine"],
  ["auth-guard", "ledger-engine"],
  ["workflow-engine", "event-stream"],
  ["ledger-engine", "event-stream"],
  ["notification-broker", "event-stream"],
  ["event-stream", "pg-cluster"],
  ["event-stream", "cache-layer"],
  ["ledger-engine", "pg-cluster"],
  ["workflow-engine", "cache-layer"],
];

export function CustomSoftwareCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // View mode tab state
  const [activeTab, setActiveTab] = useState<"architecture" | "portal" | "api">("architecture");

  // Selected 3D Node
  const [selectedNode, setSelectedNode] = useState<ArchNode>(ARCH_NODES[4]); // default ledger
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // 3D Camera / Orbit State
  const cameraRef = useRef({
    rotX: 0.28,
    rotY: -0.45,
    targetRotX: 0.28,
    targetRotY: -0.45,
    zoom: 1.05,
    isDragging: false,
    lastMouseX: 0,
    lastMouseY: 0,
    autoRotate: true,
  });

  const [autoRotate, setAutoRotate] = useState(true);

  // Live Metrics & Simulation State
  const [txCount, setTxCount] = useState(128490);
  const [burstActive, setBurstActive] = useState(false);
  const [liveP99, setLiveP99] = useState(12);

  // ERP Portal Tab State
  const [portalFilter, setPortalFilter] = useState<"all" | "pending" | "settled">("all");
  const [portalRecords, setPortalRecords] = useState([
    {
      id: "TX-9042",
      client: "Greenland Capital Corp",
      module: "Underwriting Flow",
      amount: "₹ 4,80,000",
      status: "Settled",
      rule: "Auto-Reconciled",
      time: "2 mins ago",
    },
    {
      id: "TX-9043",
      client: "Eco World Logistics",
      module: "Fleet Route Billing",
      amount: "₹ 1,25,000",
      status: "Pending Review",
      rule: "Tier-2 Approval",
      time: "4 mins ago",
    },
    {
      id: "TX-9044",
      client: "Apex Real Estate Partners",
      module: "Asset Custody Transfer",
      amount: "₹ 18,50,000",
      status: "Settled",
      rule: "Multi-Sig Signed",
      time: "12 mins ago",
    },
    {
      id: "TX-9045",
      client: "Vanguard Tech Ventures",
      module: "Subscription Billing API",
      amount: "₹ 74,500",
      status: "Processing",
      rule: "Webhook Trigger",
      time: "Just now",
    },
  ]);

  // API Tab State
  const [apiMethod, setApiMethod] = useState<"mutation" | "query">("mutation");
  const [apiExecuting, setApiExecuting] = useState(false);
  const [apiLatencyResult, setApiLatencyResult] = useState<string>("16ms");
  const [apiPayloadResult, setApiPayloadResult] = useState<string>(
    JSON.stringify(
      {
        status: 200,
        success: true,
        transactionId: "TX-9046",
        workflowStatus: "COMMITTED",
        auditHash: "0x8f9c1a...b24e",
        idempotencyVerified: true,
        executionTimeMs: 16.4,
      },
      null,
      2
    )
  );

  // Business rules toggle
  const [rules, setRules] = useState({
    idempotency: true,
    zeroTrustRbac: true,
    auditLogging: true,
    optimisticLocking: true,
  });

  // Toggle rule helper
  const toggleRule = (key: keyof typeof rules) => {
    setRules((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Dispatch Transaction Simulation
  const dispatchTransaction = useCallback(() => {
    setBurstActive(true);
    setTxCount((c) => c + 1);
    setLiveP99((prev) => Math.max(9, Math.min(22, prev + (Math.random() > 0.5 ? 1 : -1))));

    // Add record to portal
    const newTx = {
      id: `TX-${Math.floor(9046 + Math.random() * 900)}`,
      client: ["Greenland Capital Corp", "Techgy Enterprise Hub", "Eco World Logistics", "Apex Partners"][
        Math.floor(Math.random() * 4)
      ],
      module: ["Underwriting Engine", "Order Ledger", "RBAC Gateway", "Event Stream"][
        Math.floor(Math.random() * 4)
      ],
      amount: `₹ ${(Math.floor(Math.random() * 150) * 10000 + 45000).toLocaleString("en-IN")}`,
      status: "Settled",
      rule: "Auto-Reconciled",
      time: "Just now",
    };

    setPortalRecords((prev) => [newTx, ...prev.slice(0, 4)]);

    setTimeout(() => {
      setBurstActive(false);
    }, 1200);
  }, []);

  // Run API simulation
  const executeApiQuery = () => {
    setApiExecuting(true);
    setTimeout(() => {
      const ms = Math.floor(12 + Math.random() * 14);
      setApiLatencyResult(`${ms}ms`);
      setApiPayloadResult(
        JSON.stringify(
          {
            status: 200,
            success: true,
            transactionId: `TX-${Math.floor(9046 + Math.random() * 900)}`,
            workflowStatus: "COMMITTED",
            auditHash: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`,
            idempotencyVerified: rules.idempotency,
            rbacEnforced: rules.zeroTrustRbac,
            executionTimeMs: ms + 0.4,
          },
          null,
          2
        )
      );
      setApiExecuting(false);
      setTxCount((c) => c + 1);
    }, 450);
  };

  // GSAP Ambient Orbs & Pulse Animations
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".soft-ambient-orb-1", {
        x: 25,
        y: -15,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".soft-ambient-orb-2", {
        x: -20,
        y: 20,
        duration: 5.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".soft-card-float", {
        y: -4,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.15,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeTab]);

  // Periodic subtle counter tick
  useEffect(() => {
    const timer = setInterval(() => {
      setTxCount((c) => c + 1);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  // 3D Canvas WebGL & Perspective Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particleOffset = 0;

    const render = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      // Handle Retina pixel ratio
      const dpr = window.devicePixelRatio || 1;
      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Smooth camera interpolation
      const cam = cameraRef.current;
      if (cam.autoRotate && !cam.isDragging) {
        cam.targetRotY += 0.0035;
      }
      cam.rotX += (cam.targetRotX - cam.rotX) * 0.12;
      cam.rotY += (cam.targetRotY - cam.rotY) * 0.12;

      particleOffset = (particleOffset + 0.012) % 1;

      // 3D Projection Math helper
      const project = (x: number, y: number, z: number) => {
        // Rotate Y
        const cosY = Math.cos(cam.rotY);
        const sinY = Math.sin(cam.rotY);
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;

        // Rotate X
        const cosX = Math.cos(cam.rotX);
        const sinX = Math.sin(cam.rotX);
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        // Perspective
        const focal = 480 * cam.zoom;
        const dist = 380;
        const scale = focal / (focal + z2 + dist);

        return {
          x: cx + x1 * scale,
          y: cy + y2 * scale,
          scale: Math.max(0.2, scale),
          depth: z2,
        };
      };

      // 1. Draw 3D Isometric Ground Grid Plates
      const drawLayerPlanes = () => {
        const layersY = [-140, -70, 10, 85, 155];
        const planeWidth = 260;
        const planeDepth = 150;

        layersY.forEach((ly, idx) => {
          const corners = [
            project(-planeWidth / 2, ly + 25, -planeDepth / 2),
            project(planeWidth / 2, ly + 25, -planeDepth / 2),
            project(planeWidth / 2, ly + 25, planeDepth / 2),
            project(-planeWidth / 2, ly + 25, planeDepth / 2),
          ];

          ctx.beginPath();
          ctx.moveTo(corners[0].x, corners[0].y);
          for (let i = 1; i < 4; i++) {
            ctx.lineTo(corners[i].x, corners[i].y);
          }
          ctx.closePath();

          // Subtle plane tint
          ctx.fillStyle = idx === 2 ? "rgba(0, 34, 255, 0.035)" : "rgba(15, 26, 52, 0.02)";
          ctx.fill();

          ctx.strokeStyle = idx === 2 ? "rgba(0, 34, 255, 0.15)" : "rgba(226, 232, 240, 0.6)";
          ctx.lineWidth = 1;
          ctx.stroke();

          // Draw layer label in 3D
          const labelPos = project(planeWidth / 2 + 10, ly + 25, 0);
          ctx.fillStyle = idx === 2 ? "#0022ff" : "rgba(0, 0, 0, 0.4)";
          ctx.font = `600 ${Math.max(9, 10 * labelPos.scale)}px monospace`;
          const layerTitles = [
            "T0 · EDGE INGRESS",
            "T1 · API & AUTH GATEWAY",
            "T2 · DOMAIN SERVICES",
            "T3 · EVENT STREAMING",
            "T4 · STORAGE & CACHE",
          ];
          ctx.fillText(layerTitles[idx], labelPos.x, labelPos.y);
        });
      };

      drawLayerPlanes();

      // 2. Project Nodes
      const projectedNodes = ARCH_NODES.map((node) => {
        const proj = project(node.x, node.y, node.z);
        return {
          ...node,
          projX: proj.x,
          projY: proj.y,
          scale: proj.scale,
          depth: proj.depth,
        };
      });

      // 3. Draw 3D Connection Edges with Moving Particle Streams
      ARCH_EDGES.forEach(([fromId, toId]) => {
        const fromNode = projectedNodes.find((n) => n.id === fromId);
        const toNode = projectedNodes.find((n) => n.id === toId);
        if (!fromNode || !toNode) return;

        const isRelated =
          selectedNode.id === fromId ||
          selectedNode.id === toId ||
          hoveredNodeId === fromId ||
          hoveredNodeId === toId;

        // Line
        ctx.beginPath();
        ctx.moveTo(fromNode.projX, fromNode.projY);
        // Subtle bezier curve in 3D
        const midX = (fromNode.projX + toNode.projX) / 2;
        const midY = (fromNode.projY + toNode.projY) / 2 - 8 * fromNode.scale;
        ctx.quadraticCurveTo(midX, midY, toNode.projX, toNode.projY);

        ctx.strokeStyle = isRelated
          ? "rgba(0, 34, 255, 0.65)"
          : burstActive
            ? "rgba(16, 185, 129, 0.45)"
            : "rgba(0, 34, 255, 0.16)";
        ctx.lineWidth = isRelated ? 2 : 1;
        ctx.stroke();

        // 3D Moving Data Packet on Edge
        const packetT = (particleOffset + (fromNode.x + fromNode.y) * 0.002 + 1) % 1;
        const px =
          (1 - packetT) * (1 - packetT) * fromNode.projX +
          2 * (1 - packetT) * packetT * midX +
          packetT * packetT * toNode.projX;
        const py =
          (1 - packetT) * (1 - packetT) * fromNode.projY +
          2 * (1 - packetT) * packetT * midY +
          packetT * packetT * toNode.projY;

        ctx.beginPath();
        const pRadius = (isRelated ? 3.5 : 2.2) * fromNode.scale;
        ctx.arc(px, py, pRadius, 0, Math.PI * 2);
        ctx.fillStyle = burstActive ? "#10b981" : isRelated ? "#0022ff" : "#3b82f6";
        ctx.fill();

        // Packet glow
        if (isRelated || burstActive) {
          ctx.beginPath();
          ctx.arc(px, py, pRadius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = burstActive ? "rgba(16, 185, 129, 0.3)" : "rgba(0, 34, 255, 0.25)";
          ctx.fill();
        }
      });

      // 4. Sort Nodes by Depth for correct 3D occlusion
      const sortedNodes = [...projectedNodes].sort((a, b) => a.depth - b.depth);

      // 5. Draw 3D Nodes
      sortedNodes.forEach((node) => {
        const isSelected = selectedNode.id === node.id;
        const isHovered = hoveredNodeId === node.id;
        const radius = (isSelected ? 16 : 12) * node.scale;

        // Outer Aura / Glow
        if (isSelected || isHovered) {
          const glowGrad = ctx.createRadialGradient(
            node.projX,
            node.projY,
            radius * 0.4,
            node.projX,
            node.projY,
            radius * 3.2
          );
          glowGrad.addColorStop(0, "rgba(0, 34, 255, 0.35)");
          glowGrad.addColorStop(1, "rgba(0, 34, 255, 0)");
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(node.projX, node.projY, radius * 3.2, 0, Math.PI * 2);
          ctx.fill();
        }

        // 3D Isometric Cylinder / Cube Base Shadow
        ctx.beginPath();
        ctx.ellipse(node.projX, node.projY + radius * 0.8, radius * 1.1, radius * 0.4, 0, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(15, 26, 52, 0.15)";
        ctx.fill();

        // Main Node Sphere / Prism Body
        ctx.beginPath();
        ctx.arc(node.projX, node.projY, radius, 0, Math.PI * 2);
        const nodeGrad = ctx.createRadialGradient(
          node.projX - radius * 0.35,
          node.projY - radius * 0.35,
          radius * 0.15,
          node.projX,
          node.projY,
          radius
        );
        nodeGrad.addColorStop(0, isSelected ? "#ffffff" : node.accent);
        nodeGrad.addColorStop(1, isSelected ? "#0022ff" : node.color);
        ctx.fillStyle = nodeGrad;
        ctx.fill();

        // Node Rim Border
        ctx.strokeStyle = isSelected ? "#0022ff" : "rgba(255, 255, 255, 0.85)";
        ctx.lineWidth = isSelected ? 2.5 : 1.5;
        ctx.stroke();

        // Inner Active Status Ping
        ctx.beginPath();
        ctx.arc(node.projX, node.projY, radius * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        // 3D Node Label Card
        const textY = node.projY - radius - 8 * node.scale;
        ctx.font = `600 ${Math.max(10, 11 * node.scale)}px sans-serif`;
        const textMetrics = ctx.measureText(node.name);
        const badgeW = textMetrics.width + 16 * node.scale;
        const badgeH = 18 * node.scale;

        // Label background badge
        ctx.fillStyle = isSelected
          ? "rgba(0, 34, 255, 0.95)"
          : isHovered
            ? "rgba(15, 26, 52, 0.9)"
            : "rgba(255, 255, 255, 0.9)";
        ctx.beginPath();
        ctx.roundRect(
          node.projX - badgeW / 2,
          textY - badgeH / 2,
          badgeW,
          badgeH,
          4 * node.scale
        );
        ctx.fill();
        ctx.strokeStyle = isSelected ? "#0022ff" : "rgba(226, 232, 240, 0.9)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Label text
        ctx.fillStyle = isSelected || isHovered ? "#ffffff" : "#111625";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.name, node.projX, textY);

        // Latency tag below node
        if (isSelected || isHovered) {
          ctx.font = `700 ${Math.max(9, 9 * node.scale)}px monospace`;
          ctx.fillStyle = "#10b981";
          ctx.fillText(`⚡ ${node.latency}`, node.projX, node.projY + radius + 12 * node.scale);
        }
      });

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [burstActive, selectedNode, hoveredNodeId]);

  // Canvas Mouse Dragging & Orbit Event Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const cam = cameraRef.current;
    cam.isDragging = true;
    cam.lastMouseX = e.clientX;
    cam.lastMouseY = e.clientY;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const cam = cameraRef.current;
    if (cam.isDragging) {
      const deltaX = e.clientX - cam.lastMouseX;
      const deltaY = e.clientY - cam.lastMouseY;
      cam.targetRotY += deltaX * 0.007;
      cam.targetRotX = Math.max(-0.6, Math.min(0.8, cam.targetRotX + deltaY * 0.007));
      cam.lastMouseX = e.clientX;
      cam.lastMouseY = e.clientY;
      return;
    }

    // Hit-testing / Raycasting for hover
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const cx = canvas.clientWidth / 2;
    const cy = canvas.clientHeight / 2;

    let foundHover: string | null = null;
    for (const node of ARCH_NODES) {
      // Rotate Y
      const cosY = Math.cos(cam.rotY);
      const sinY = Math.sin(cam.rotY);
      const x1 = node.x * cosY + node.z * sinY;
      const z1 = -node.x * sinY + node.z * cosY;

      // Rotate X
      const cosX = Math.cos(cam.rotX);
      const sinX = Math.sin(cam.rotX);
      const y2 = node.y * cosX - z1 * sinX;
      const z2 = node.y * sinX + z1 * cosX;

      const focal = 480 * cam.zoom;
      const dist = 380;
      const scale = focal / (focal + z2 + dist);

      const px = cx + x1 * scale;
      const py = cy + y2 * scale;

      const hitDist = Math.hypot(mx - px, my - py);
      if (hitDist < 25 * scale) {
        foundHover = node.id;
        break;
      }
    }
    setHoveredNodeId(foundHover);
  };

  const handleMouseUp = () => {
    cameraRef.current.isDragging = false;
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const cx = canvas.clientWidth / 2;
    const cy = canvas.clientHeight / 2;
    const cam = cameraRef.current;

    for (const node of ARCH_NODES) {
      const cosY = Math.cos(cam.rotY);
      const sinY = Math.sin(cam.rotY);
      const x1 = node.x * cosY + node.z * sinY;
      const z1 = -node.x * sinY + node.z * cosY;

      const cosX = Math.cos(cam.rotX);
      const sinX = Math.sin(cam.rotX);
      const y2 = node.y * cosX - z1 * sinX;
      const z2 = node.y * sinX + z1 * cosX;

      const focal = 480 * cam.zoom;
      const dist = 380;
      const scale = focal / (focal + z2 + dist);

      const px = cx + x1 * scale;
      const py = cy + y2 * scale;

      const hitDist = Math.hypot(mx - px, my - py);
      if (hitDist < 25 * scale) {
        setSelectedNode(node);
        break;
      }
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const cam = cameraRef.current;
    cam.zoom = Math.max(0.7, Math.min(1.6, cam.zoom - e.deltaY * 0.001));
  };

  const resetCamera = () => {
    const cam = cameraRef.current;
    cam.targetRotX = 0.28;
    cam.targetRotY = -0.45;
    cam.zoom = 1.05;
  };

  const toggleAutoRotate = () => {
    setAutoRotate(!autoRotate);
    cameraRef.current.autoRotate = !autoRotate;
  };

  return (
    <div
      ref={containerRef}
      className="service-demo relative w-full h-full min-h-[620px] bg-[#f8f9fa] text-[#000000] overflow-hidden flex flex-col select-none rounded-md border border-rule/50 font-sans shadow-sm"
    >
      {/* Background Ambient GSAP Orbs */}
      <div className="soft-ambient-orb-1 absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-100/50 blur-3xl pointer-events-none" />
      <div className="soft-ambient-orb-2 absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-indigo-100/40 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0022ff08_1px,transparent_1px),linear-gradient(to_bottom,#0022ff08_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

      {/* Top Enterprise Control Bar */}
      <div className="demo-row demo-toolbar relative z-20 flex items-center justify-between px-6 py-3.5 border-b border-rule bg-white/95 backdrop-blur-md flex-wrap gap-3">
        <div className="flex items-center gap-2.5 text-[12px] font-mono">
          <span className="w-2.5 h-2.5 rounded-full bg-brand animate-pulse" />
          <span className="font-bold text-brand uppercase tracking-wider">
            Enterprise Architecture Grid
          </span>
          <span className="text-[#000000]/40 text-[11px] hidden sm:inline">
            / 3D Real-Time WebGL Distributed Mesh
          </span>
        </div>

        {/* View Mode Switcher Tabs */}
        <div className="demo-tabs flex items-center gap-1 bg-[#e2e8f0]/60 p-0.5 rounded-lg border border-rule text-[11px] font-mono">
          <button
            type="button"
            onClick={() => setActiveTab("architecture")}
            className={`px-3 py-1.5 rounded-md transition-all font-bold ${
              activeTab === "architecture"
                ? "bg-white text-brand shadow-xs border border-rule/50"
                : "text-[#000000]/60 hover:text-[#000000]"
            }`}
          >
            3D Architecture
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("portal")}
            className={`px-3 py-1.5 rounded-md transition-all font-bold ${
              activeTab === "portal"
                ? "bg-white text-brand shadow-xs border border-rule/50"
                : "text-[#000000]/60 hover:text-[#000000]"
            }`}
          >
            ERP Portal
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("api")}
            className={`px-3 py-1.5 rounded-md transition-all font-bold ${
              activeTab === "api"
                ? "bg-white text-brand shadow-xs border border-rule/50"
                : "text-[#000000]/60 hover:text-[#000000]"
            }`}
          >
            APIs & Rules
          </button>
        </div>
      </div>

      {/* Main Tab Content Body */}
      <div className="demo-body relative z-10 flex-1 p-5 flex flex-col overflow-hidden">
        {/* TAB 1: 3D REAL-TIME ARCHITECTURE ENGINE */}
        {activeTab === "architecture" && (
          <div className="grid grid-cols-[1.5fr_0.9fr] gap-4 items-stretch flex-1 min-h-[490px] max-[1024px]:grid-cols-1">
            {/* Left Column: 3D WebGL / Canvas Stage */}
            <div className="relative w-full h-full min-h-[420px] bg-[#0b0f19] rounded-xl border border-rule shadow-inner overflow-hidden flex flex-col justify-between">
              {/* Top 3D Viewport Badges */}
              <div className="absolute top-3.5 left-4 right-4 z-30 flex justify-between items-center text-[10px] font-mono pointer-events-none flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-white/15 text-white font-bold flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  REAL-TIME 3D WEBGL • 360° ORBIT / PAN / ZOOM
                </span>

                <div className="flex items-center gap-1.5 pointer-events-auto">
                  <button
                    type="button"
                    onClick={toggleAutoRotate}
                    className={`px-2 py-1 rounded text-[10px] font-mono transition-colors ${
                      autoRotate
                        ? "bg-brand/80 text-white border border-brand"
                        : "bg-black/60 text-white/70 border border-white/10 hover:text-white"
                    }`}
                    title="Toggle continuous 360 auto-rotation"
                  >
                    {autoRotate ? "Auto-Orbit: ON" : "Auto-Orbit: OFF"}
                  </button>
                  <button
                    type="button"
                    onClick={resetCamera}
                    className="px-2 py-1 rounded bg-black/60 text-white/70 border border-white/10 hover:text-white text-[10px] font-mono"
                    title="Reset 3D camera to default isometric view"
                  >
                    Reset View
                  </button>
                </div>
              </div>

              {/* 3D Canvas Element */}
              <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onClick={handleClick}
                onWheel={handleWheel}
                className="w-full h-full flex-1 cursor-grab active:cursor-grabbing"
              />

              {/* Bottom 3D Viewport Controls & Telemetry Bar */}
              <div className="demo-row relative z-30 px-4 py-3 bg-[#0b0f19]/95 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/90 flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={dispatchTransaction}
                    className="px-3 py-1.5 rounded bg-brand text-white font-bold hover:brightness-110 active:scale-95 transition-all shadow flex items-center gap-1.5"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
                    Dispatch Transaction Pulse
                  </button>
                  <span className="text-white/60 text-[10px] hidden sm:inline">
                    Drag to Orbit • Click node to inspect
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[11px]">
                  <span className="text-emerald-400 font-semibold">
                    p99: {liveP99}ms
                  </span>
                  <span className="text-white/50">|</span>
                  <span className="text-blue-300 font-medium">
                    {txCount.toLocaleString()} Transacted
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Active Node Inspector & System Telemetry Deck */}
            <div className="flex flex-col justify-between gap-3.5 h-full">
              {/* Selected Node Specs Card */}
              <div className="bg-white p-5 rounded-xl border border-rule shadow-sm flex flex-col justify-between flex-1">
                <div>
                  <div className="demo-row flex items-center justify-between mb-2.5">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-brand px-2.5 py-0.5 rounded bg-blue-50 border border-blue-200 font-bold">
                      {selectedNode.layer}
                    </span>
                    <span className="text-emerald-600 font-mono font-bold text-[11px] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {selectedNode.status}
                    </span>
                  </div>

                  <h4 className="text-[20px] font-display font-medium text-[#000000] mb-1">
                    {selectedNode.name}
                  </h4>

                  <p className="text-[13px] text-[#000000]/70 leading-relaxed mb-4">
                    {selectedNode.spec}
                  </p>
                </div>

                {/* Node Metrics & Architecture Matrix */}
                <div className="space-y-3">
                  <div className="p-3 bg-[#f8f9fa] rounded-lg border border-rule text-[11px] font-mono space-y-2">
                    <div className="flex justify-between border-b border-rule/50 pb-1.5">
                      <span className="text-[#000000]/50">p99 Latency SLA</span>
                      <span className="font-bold text-emerald-600">{selectedNode.latency}</span>
                    </div>
                    <div className="flex justify-between border-b border-rule/50 pb-1.5">
                      <span className="text-[#000000]/50">Throughput Capacity</span>
                      <span className="font-bold text-slate-800">{selectedNode.throughput}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#000000]/50">Compute Allocation</span>
                      <span className="font-bold text-brand">{selectedNode.cpu}</span>
                    </div>
                  </div>

                  {/* Architecture Capability Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedNode.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f1f5f9] text-[#000000]/80 border border-rule"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Quick Switcher Bar */}
              <div className="bg-white p-3.5 rounded-xl border border-rule shadow-sm flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#000000]/60">Fault Tolerance</span>
                <span className="text-brand font-bold">Multi-AZ Zero-Downtime Hot Failover</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ENTERPRISE ERP / WORKFLOW COCKPIT SIMULATOR */}
        {activeTab === "portal" && (
          <div className="bg-white rounded-xl border border-rule shadow-sm p-5 flex flex-col justify-between flex-1 min-h-[490px]">
            <div>
              {/* Portal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-rule flex-wrap gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-brand font-bold">
                      Greenland Capital Platform
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono font-medium">
                      Operational Ledger v3.4
                    </span>
                  </div>
                  <h4 className="text-[18px] font-display font-medium text-[#000000] mt-0.5">
                    Real-Time Settlement & Approval Operations
                  </h4>
                </div>

                {/* Filter Pills & Action */}
                <div className="flex items-center gap-2">
                  <div className="flex rounded-md border border-rule p-0.5 bg-[#f8f9fa] text-[11px] font-mono">
                    <button
                      type="button"
                      onClick={() => setPortalFilter("all")}
                      className={`px-2.5 py-1 rounded ${
                        portalFilter === "all" ? "bg-white font-bold text-brand shadow-xs" : "text-[#000000]/60"
                      }`}
                    >
                      All Records
                    </button>
                    <button
                      type="button"
                      onClick={() => setPortalFilter("pending")}
                      className={`px-2.5 py-1 rounded ${
                        portalFilter === "pending" ? "bg-white font-bold text-brand shadow-xs" : "text-[#000000]/60"
                      }`}
                    >
                      Pending Review
                    </button>
                    <button
                      type="button"
                      onClick={() => setPortalFilter("settled")}
                      className={`px-2.5 py-1 rounded ${
                        portalFilter === "settled" ? "bg-white font-bold text-brand shadow-xs" : "text-[#000000]/60"
                      }`}
                    >
                      Settled
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={dispatchTransaction}
                    className="px-3 py-1.5 rounded-md bg-brand text-white font-medium text-[11px] hover:brightness-110 flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
                  >
                    + Trigger Run
                  </button>
                </div>
              </div>

              {/* Live Operational Records Table */}
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-[12px] border-collapse">
                  <thead>
                    <tr className="border-b border-rule bg-[#f8f9fa] text-[#000000]/60 font-mono text-[11px]">
                      <th className="py-2.5 px-3">RECORD ID</th>
                      <th className="py-2.5 px-3">CLIENT ENTITY</th>
                      <th className="py-2.5 px-3">BUSINESS MODULE</th>
                      <th className="py-2.5 px-3">AMOUNT</th>
                      <th className="py-2.5 px-3">BUSINESS RULE</th>
                      <th className="py-2.5 px-3">STATUS</th>
                      <th className="py-2.5 px-3 text-right">TIMESTAMP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rule/60 font-sans">
                    {portalRecords
                      .filter((r) =>
                        portalFilter === "all"
                          ? true
                          : portalFilter === "pending"
                            ? r.status.includes("Pending")
                            : r.status === "Settled"
                      )
                      .map((rec) => (
                        <tr
                          key={rec.id}
                          className="hover:bg-blue-50/40 transition-colors group cursor-pointer"
                        >
                          <td className="py-3 px-3 font-mono font-bold text-brand">
                            {rec.id}
                          </td>
                          <td className="py-3 px-3 font-medium text-[#000000]">
                            {rec.client}
                          </td>
                          <td className="py-3 px-3 text-[#000000]/70 font-mono text-[11px]">
                            {rec.module}
                          </td>
                          <td className="py-3 px-3 font-mono font-bold text-slate-800">
                            {rec.amount}
                          </td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 rounded bg-blue-50 text-brand border border-blue-200 text-[10px] font-mono">
                              {rec.rule}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold inline-flex items-center gap-1 ${
                                rec.status === "Settled"
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : rec.status.includes("Pending")
                                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                                    : "bg-blue-50 text-blue-700 border border-blue-200"
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  rec.status === "Settled"
                                    ? "bg-emerald-500"
                                    : rec.status.includes("Pending")
                                      ? "bg-amber-500"
                                      : "bg-blue-500 animate-pulse"
                                }`}
                              />
                              {rec.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right text-[#000000]/50 font-mono text-[11px]">
                            {rec.time}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Key Capabilities Bar */}
            <div className="mt-4 pt-4 border-t border-rule grid grid-cols-3 gap-4 max-[767px]:grid-cols-1">
              <div className="p-3 bg-[#f8f9fa] rounded-lg border border-rule text-[11px]">
                <p className="font-bold text-[#000000] mb-0.5">Role-Based Access Control</p>
                <p className="text-[#000000]/60">Departmental permissions, segregation of duties & audit trails.</p>
              </div>
              <div className="p-3 bg-[#f8f9fa] rounded-lg border border-rule text-[11px]">
                <p className="font-bold text-[#000000] mb-0.5">Automated Reconciliation</p>
                <p className="text-[#000000]/60">Zero manual spreadsheets. Nightly ledger sync with core banking.</p>
              </div>
              <div className="p-3 bg-[#f8f9fa] rounded-lg border border-rule text-[11px]">
                <p className="font-bold text-[#000000] mb-0.5">Immutable Audit Log</p>
                <p className="text-[#000000]/60">Every mutation signed and timestamped for regulatory compliance.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DISTRIBUTED APIS & BUSINESS RULES */}
        {activeTab === "api" && (
          <div className="grid grid-cols-[1.2fr_0.8fr] gap-4 items-stretch flex-1 min-h-[490px] max-[1024px]:grid-cols-1">
            {/* Left Column: Interactive API Playground */}
            <div className="bg-[#0b0f19] text-white rounded-xl border border-rule p-4 flex flex-col justify-between shadow-sm font-mono text-[12px]">
              <div>
                {/* API Request Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30 text-[11px]">
                      POST
                    </span>
                    <span className="text-white/90 text-[12px]">
                      /graphql · mutateSettleTransaction
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={executeApiQuery}
                    disabled={apiExecuting}
                    className="px-3 py-1 rounded bg-brand text-white font-bold hover:brightness-110 active:scale-95 transition-all text-[11px] flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {apiExecuting ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                        Executing...
                      </>
                    ) : (
                      <>
                        <span>Execute Contract</span>
                        <ArrowUpRight size={14} />
                      </>
                    )}
                  </button>
                </div>

                {/* Code Query & Response Split */}
                <div className="grid grid-cols-2 gap-3 mt-3 text-[11px] max-[640px]:grid-cols-1">
                  {/* Request Payload */}
                  <div className="bg-black/40 p-3 rounded-lg border border-white/10">
                    <div className="text-white/40 mb-1.5 uppercase tracking-wider text-[10px]">
                      Request Payload (GraphQL)
                    </div>
                    <pre className="text-blue-300 leading-relaxed overflow-x-auto">
{`mutation SettleTransaction {
  executeSettlement(input: {
    transactionId: "TX-9046"
    amount: 1850000
    currency: "INR"
    idempotencyKey: "idem_9f2a..."
    rules: {
      strictLock: true
      rbacCheck: true
    }
  }) {
    status
    auditHash
    executionTimeMs
  }
}`}
                    </pre>
                  </div>

                  {/* Live Response Payload */}
                  <div className="bg-black/40 p-3 rounded-lg border border-white/10">
                    <div className="flex justify-between items-center text-white/40 mb-1.5 uppercase tracking-wider text-[10px]">
                      <span>Response Payload</span>
                      <span className="text-emerald-400 font-bold">
                        200 OK · {apiLatencyResult}
                      </span>
                    </div>
                    <pre className="text-emerald-300 leading-relaxed overflow-x-auto">
                      {apiPayloadResult}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Bottom API SLA */}
              <div className="pt-3 border-t border-white/10 flex justify-between items-center text-[10px] text-white/60">
                <span>Schema: Contract-First OpenAPI 3.1 & GraphQL Federation</span>
                <span className="text-emerald-400 font-semibold">TLS 1.3 mTLS Encrypted</span>
              </div>
            </div>

            {/* Right Column: Business Rule Engine Toggles */}
            <div className="bg-white p-5 rounded-xl border border-rule shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand px-2.5 py-0.5 rounded bg-blue-50 border border-blue-200 font-bold">
                  Rule Engine Configuration
                </span>
                <h4 className="text-[18px] font-display font-medium text-[#000000] mt-2 mb-1">
                  Enterprise Policy Enforcer
                </h4>
                <p className="text-[12px] text-[#000000]/70 mb-4 leading-relaxed">
                  Toggle critical business constraints enforced across custom microservices and database transactions.
                </p>

                {/* Toggles */}
                <div className="space-y-2.5 text-[12px]">
                  <label
                    onClick={() => toggleRule("idempotency")}
                    className="flex items-center justify-between p-3 rounded-lg border border-rule bg-[#f8f9fa] cursor-pointer hover:border-brand/40 transition-colors"
                  >
                    <div>
                      <p className="font-bold text-[#000000]">Strict Idempotency Guard</p>
                      <p className="text-[11px] text-[#000000]/60">
                        Prevents duplicate financial executions on retry.
                      </p>
                    </div>
                    <span
                      className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors ${
                        rules.idempotency ? "bg-brand" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`bg-white w-3.5 h-3.5 rounded-full shadow-md transform transition-transform ${
                          rules.idempotency ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </span>
                  </label>

                  <label
                    onClick={() => toggleRule("zeroTrustRbac")}
                    className="flex items-center justify-between p-3 rounded-lg border border-rule bg-[#f8f9fa] cursor-pointer hover:border-brand/40 transition-colors"
                  >
                    <div>
                      <p className="font-bold text-[#000000]">Zero-Trust RBAC Validation</p>
                      <p className="text-[11px] text-[#000000]/60">
                        Verifies cryptographic claim at every microservice hop.
                      </p>
                    </div>
                    <span
                      className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors ${
                        rules.zeroTrustRbac ? "bg-brand" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`bg-white w-3.5 h-3.5 rounded-full shadow-md transform transition-transform ${
                          rules.zeroTrustRbac ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </span>
                  </label>

                  <label
                    onClick={() => toggleRule("optimisticLocking")}
                    className="flex items-center justify-between p-3 rounded-lg border border-rule bg-[#f8f9fa] cursor-pointer hover:border-brand/40 transition-colors"
                  >
                    <div>
                      <p className="font-bold text-[#000000]">Optimistic Concurrency Lock</p>
                      <p className="text-[11px] text-[#000000]/60">
                        Zero data races across high-concurrency database writes.
                      </p>
                    </div>
                    <span
                      className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors ${
                        rules.optimisticLocking ? "bg-brand" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`bg-white w-3.5 h-3.5 rounded-full shadow-md transform transition-transform ${
                          rules.optimisticLocking ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </span>
                  </label>
                </div>
              </div>

              {/* Status Note */}
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-800 text-[11px] font-mono mt-3">
                ✓ All business rules actively compiled into CI/CD automated contract tests.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Clean Bottom Title Block */}
      <div className="demo-row demo-footer relative z-10 px-6 py-2.5 border-t border-rule bg-white/95 flex items-center justify-between text-[11px] text-[#000000]/50 font-mono">
        <span className="flex items-center gap-1.5 text-brand font-bold">
          <span className="w-2 h-2 rounded-full bg-brand animate-ping" />
          TechGy Link Custom Enterprise Software Suite
        </span>
        <span className="hidden sm:inline">
          Next.js • Microservices • Kafka • PostgreSQL • Zero-Downtime CI/CD
        </span>
      </div>
    </div>
  );
}

