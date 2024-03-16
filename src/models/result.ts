export type CheckResult = {
    code: number;
    connectivity: Connectivity[];
    elapsedTime: string;
    srv: SrvEntry[];
}

export type SrvEntry = {
    Srv: string
    Fqdn: string
    Ip: string
    Priority: string
    Weight: string
    Port: number
    Proto: string
    IsOpened: boolean
    CertsChain: Cert[],
    ServiceName: string
}

export type Cert = {
    Txt: string
    Cn: string
    Subject: string
    San: string
    KeyUsage: string[]
    ExtKeyUsage: string[]
    Issuer: string
    NotBefore: string
    NotAfter: string
}

export type Connectivity = {
    Fqdn: string;
    Ip: string;
    Ports: Ports[];
}

export type Ports = {
    IsOpened: boolean
    Num: number
    Proto: string
    Type: string
    ServiceName: string
}