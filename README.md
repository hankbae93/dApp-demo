# dApp

## Stacks

1.  `Solidity`

        Solidity is an object-oriented, high-level language for implementing smart contracts.
        Smart contracts are programs which govern the behaviour of accounts within the Ethereum state.

    EVM 환경에서 돌아가는 언어. 클레이튼 네트워크도 이더리움 파생이라 선택.

2.  `remixd IDE`

    리믹스(Remix)는 브라우저에서 솔리디티 프로그래밍 언어로 스마트 계약 개발과 구축을 지원하는 통합개발환경(IDE)이다.

    브라우저로 사설망이나 테스트넷의 이더리움 블록체인에 연결해 스마트 계약 배포와 테스트를 할 수 있다.

    [Klayton IDE](https://ide.klaytn.foundation/#optimize=false&runs=200&evmVersion=london&version=soljson-v0.8.7+commit.e28d00a7.js) / [NPM 설치](https://www.npmjs.com/package/@remix-project/remixd)

    ```zsh
     remixd -s . --remix-ide https://ide.klaytn.foundation/
    ```

    remixd 설치 후 해당 URL을 연결하면 로컬의 있는 소스코드를 IDE에서 편집 및 테스트가 가능하다.

3.  `openzepplin`

    솔리디티 기반의 스마트 컨트랙트를 개발하는데 도움을 주는 프레임워크

    토큰에도 http처럼 표준이 있으며 그런 표준 구성과 개발을 도와줌

    `ERC721`은 NFT를 발행할 수 있다.

4.  `caver-js`

        caver-js는 개발자가 HTTP 또는 웹소켓 연결을 사용하여 Klaytn 노드와
        상호작용할 수 있도록 하는 자바스크립트 API 라이브러리입니다. npm 이용이 가능합니다.

    스마트 컨트랙트와 dApp을 연결해주는 라이브러리.

5.  `kaikas 지갑`

        Kaikas(카이카스)는 PC 웹 브라우저 확장 프로그램 형태의 글로벌 디지털 자산 지갑입니다.
        퍼블릭 블록체인 플랫폼인 Klaytn(클레이튼) 기반의 디지털 자산을 관리할 수 있습니다

<br />

# Smart Contract - NFT

## OpenSea Metadata Standard

https://docs.opensea.io/docs/metadata-standards

NFT 메타데이터를 작성하는 표준 방안.

## IPFS

블록체인 내에서 이미지를 관리하지 않고 여기서는 IPFS를 활용한다.

    IPFS(아이피에프에스)는 "InterPlanetary File System"의 약자로서, 분산형 파일 시스템에 데이터를 저장하고 인터넷으로 공유하기 위한 프로토콜이다.
    냅스터, 토렌트(Torrent) 등 P2P 방식으로 대용량 파일과 데이터를 공유하기 위해 사용한다.
    기존의 HTTP 방식은 데이터가 위치한 곳의 주소를 찾아가서 원하는 콘텐츠를 한꺼번에 가져오는 방식이었지만,
    IPFS는 데이터의 내용을 변환한 해시값을 이용하여 전 세계 여러 컴퓨터에 분산 저장되어 있는 콘텐츠를 찾아서
    데이터를 조각조각으로 잘게 나눠서 빠른 속도로 가져온 후 하나로 합쳐서 보여주는 방식으로 작동한다.
    해시 테이블은 정보를 키와 값의 쌍(key/value pairs)으로 저장하는데, 전 세계 수많은 분산화된 노드들이
    해당 정보를 저장하기 때문에 사용자는 IPFS를 사용함으로써 기존 HTTP 방식에 비해 훨씬 빠른 속도로 데이터를 저장하고 가져올 수 있다.
