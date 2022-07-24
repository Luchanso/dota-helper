use hyper::service::{make_service_fn, service_fn};
use hyper::{Body, Method, Request, Response, Server, StatusCode};
use serde_json::Value;
use std::{convert::From, fs, net::SocketAddr};

async fn handle(req: Request<Body>) -> Result<Response<Body>, hyper::Error> {
  let method = req.method().clone();
  let body = req.into_body();

  let full_body = hyper::body::to_bytes(body).await?;
  let _body: Result<Value, _> = serde_json::from_slice(&full_body);

  if method == Method::GET {
    let response = Response::builder()
      .status(StatusCode::BAD_REQUEST)
      .body(Body::from("{ success: false }"))
      .unwrap();

    return Ok(response);
  }

  // println!("{:?}", body);

  match fs::write("data.json", full_body) {
    Ok(_) => {
      println!("Success");
    }
    Err(_) => {}
  };

  Ok(Response::new("{ success: true }".into()))
}

#[tokio::main]
async fn main() {
  let addr = SocketAddr::from(([127, 0, 0, 1], 3001));
  let make_svc = make_service_fn(|_conn| async { Ok::<_, hyper::Error>(service_fn(handle)) });
  let server = Server::bind(&addr).serve(make_svc);

  if let Err(e) = server.await {
    eprintln!("server error: {}", e);
  }
}
